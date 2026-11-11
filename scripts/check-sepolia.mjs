import { existsSync } from "node:fs";
import { JsonRpcProvider } from "ethers";

export async function checkSepolia() {
  if (existsSync(".env")) process.loadEnvFile(".env");
  const url = process.env.SEPOLIA_RPC_URL;
  const key = process.env.SEPOLIA_PRIVATE_KEY;
  if (!url || !key || url.includes("YOUR_") || key.includes("YOUR_")) {
    throw new Error("Copy .env.example to .env and fill in SEPOLIA_RPC_URL and SEPOLIA_PRIVATE_KEY before deploying.");
  }
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== "eth-sepolia.g.alchemy.com") {
    throw new Error("SEPOLIA_RPC_URL must be an Alchemy Ethereum Sepolia HTTPS URL.");
  }
  if (!/^0x[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error("SEPOLIA_PRIVATE_KEY must be 0x followed by 64 hex digits.");
  }
  const provider = new JsonRpcProvider(url);
  try {
    const chainId = BigInt(await provider.send("eth_chainId", []));
    if (chainId !== 11155111n) throw new Error("RPC chain ID is not Sepolia (11155111). No transactions sent.");
  } catch (error) {
    // Do not print provider errors containing the private Alchemy URL.
    if (error.message.startsWith("RPC chain ID")) throw error;
    throw new Error("Could not verify Sepolia RPC. Check your Alchemy URL and connection. No transactions sent.");
  } finally {
    provider.destroy();
  }
}

if (process.argv[1]?.endsWith("check-sepolia.mjs")) {
  try { await checkSepolia(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
