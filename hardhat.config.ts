import { defineConfig, configVariable } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import nodeTestRunner from "@nomicfoundation/hardhat-node-test-runner";
import { existsSync } from "node:fs";

if (existsSync(".env")) process.loadEnvFile(".env");

export default defineConfig({
  plugins: [hardhatEthers, nodeTestRunner],
  solidity: "0.8.28",
  networks: {
    hardhat: { type: "edr-simulated", chainType: "l1" },
    sepolia: {
      type: "http",
      chainType: "l1",
      chainId: 11155111,
      // Lazy variables: local commands never need credentials.
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
  },
});
