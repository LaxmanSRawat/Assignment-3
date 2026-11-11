import { describe, it } from "node:test";
import { network } from "hardhat";

// Reusable fresh deployment. Only call after implementing token/funding TODOs.
export async function deployEmptyFixture() {
  const connection = await network.connect();
  const { ethers } = connection;
  const [admin, other] = await ethers.getSigners();
  const usdc = await ethers.deployContract("MockUSDC", [admin.address]);
  const land = await ethers.deployContract("LandToken", [admin.address]);
  await Promise.all([usdc.waitForDeployment(), land.waitForDeployment()]);
  const pool = await ethers.deployContract("LandPool", [await usdc.getAddress(), await land.getAddress(), admin.address]);
  await pool.waitForDeployment();
  const poolAddress = await pool.getAddress();
  await (await usdc.setPool(poolAddress)).wait();
  await (await land.setPool(poolAddress)).wait();
  // Close connection in your test's finally block: await connection.close().
  return { connection, ethers, admin, other, usdc, land, pool, poolAddress };
}

// Use the empty fixture for initialization/permission tests, this one for trades.
export async function deployFundedFixture() {
  const fixture = await deployEmptyFixture();
  try {
    await (await fixture.pool.initializeLiquidity()).wait();
    await (await fixture.pool.requestUsdc(100_000_000n)).wait();
    return fixture;
  } catch (error) {
    await fixture.connection.close();
    throw error;
  }
}

describe("STUDENT TODOs - pending tests are NOT assignment completion", () => {
  // TODO(student): replace each it.todo with an async test and real assertions.
  // Use node:assert/strict; assert.rejects for reverts; use bigint balances.
  it.todo("starts with zero supplies, zero balances, Year 0, correct decimals and no initialized liquidity");
  it.todo("validates constructor addresses; only admin can bind each token to a nonzero pool contract, once");
  it.todo("only the configured pool can mint each fixed supply once; arbitrary callers cannot mint");
  it.todo("only admin initializes once: pool gets 1,000 USDC and 100 LAND; wallet stays empty");
  it.todo("if either initial mint fails, both supplies and liquidityInitialized roll back");
  it.todo("requesting 100 USDC leaves wallet 100/0 and pool 900/100 without changing total supply");
  it.todo("requests transfer exactly the input, including 0.000001 USDC; repeat requests work in either year");
  it.todo("rejects zero/excess reserve requests, non-admin requests, and requests before initialization");
  it.todo("allows requesting exactly the available reserve; a later request fails without changing balances");
  it.todo("buys 20 LAND after approving 20 * 10**6 USDC; asserts all four balances");
  it.todo("rejects zero trades, insufficient approvals, insufficient wallet balances and pool reserves");
  it.todo("failed buys AND sells leave every wallet/pool token balance unchanged");
  it.todo("only admin advances once: year 5 and price 5 * 10**6; token balances unchanged");
  it.todo("rejects selling at Year 0, buying at Year 5, and all trades/advancement before initialization");
  it.todo("sells 20 LAND after approval: wallet 180 USDC/0 LAND; pool 820 USDC/100 LAND");
});
