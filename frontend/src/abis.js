// Minimal public interface, ready to use without copying Hardhat artifacts.
export const tokenAbi = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address,address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)",
];
export const poolAbi = [
  "function usdc() view returns (address)",
  "function land() view returns (address)",
  "function admin() view returns (address)",
  "function currentYear() view returns (uint256)",
  "function pricePerLand() view returns (uint256)",
  "function liquidityInitialized() view returns (bool)",
  "function initializeLiquidity()",
  "function requestUsdc(uint256)",
  "function buy(uint256)",
  "function sell(uint256)",
  "function advanceFiveYears()",
  "error NotImplemented()",
];
