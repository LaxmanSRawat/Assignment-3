import { network } from "hardhat";
import { mkdir, writeFile, rename } from "node:fs/promises";
import { checkSepolia } from "./check-sepolia.mjs";

// Check even when invoked directly, outside the npm wrapper.
await checkSepolia();
const { ethers } = await network.connect("sepolia");
if ((await ethers.provider.getNetwork()).chainId !== 11155111n) {
  throw new Error("Expected Sepolia. No transactions sent.");
}
const [deployer] = await ethers.getSigners();
const owner = await deployer.getAddress();
console.log(`Deploying for student/admin ${owner}`);

const usdc = await ethers.deployContract("MockUSDC", [owner]);
await usdc.waitForDeployment();
const land = await ethers.deployContract("LandToken", [owner]);
await land.waitForDeployment();
const pool = await ethers.deployContract("LandPool", [await usdc.getAddress(), await land.getAddress(), owner]);
await pool.waitForDeployment();
const poolAddress = await pool.getAddress();
for (const transaction of [
  () => usdc.setPool(poolAddress),
  () => land.setPool(poolAddress),
]) {
  const tx = await transaction();
  console.log(`Confirming ${tx.hash}`);
  await tx.wait();
}
const checks = await Promise.all([
  usdc.balanceOf(owner), land.balanceOf(owner), usdc.balanceOf(poolAddress), land.balanceOf(poolAddress),
  pool.currentYear(), pool.pricePerLand(), pool.liquidityInitialized(), pool.admin(), pool.usdc(), pool.land(),
  usdc.totalSupply(), land.totalSupply(), usdc.decimals(), land.decimals(),
  usdc.pool(), land.pool(), usdc.supplyMinted(), land.supplyMinted(), usdc.admin(), land.admin(),
]);
const expected = [0n, 0n, 0n, 0n, 0n, 1_000_000n, false,
  owner, await usdc.getAddress(), await land.getAddress(),
  0n, 0n, 6n, 0n, poolAddress, poolAddress, false, false, owner, owner];
if (checks.some((value, i) => value !== expected[i])) {
  throw new Error("Post-deployment checks failed. Configuration not published; inspect student TODOs.");
}
// No tokens are minted or distributed during deployment. Initialize from the UI.
// Publish only after every check passes. ABIs are bundled separately in frontend/src/abis.js.
const publicConfig = { chainId: 11155111, usdc: await usdc.getAddress(), land: await land.getAddress(), pool: poolAddress };
await mkdir("frontend/public", { recursive: true });
await writeFile("frontend/public/deployment.json.tmp", JSON.stringify(publicConfig, null, 2) + "\n");
await rename("frontend/public/deployment.json.tmp", "frontend/public/deployment.json");
console.log("Verified fresh simulation. Wrote frontend/public/deployment.json as a public deployment record.");
console.log(`Paste this line into your root .env, then restart npm run dev (or rebuild):\nVITE_POOL_ADDRESS=${poolAddress}`);
