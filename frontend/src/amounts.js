import { MaxUint256, parseUnits } from "ethers";

// Keep user-entered token amounts exact: never convert through Number/parseFloat.
export function parseLandAmount(value) {
  const text = value.trim();
  if (!/^[0-9]+$/.test(text) || text.length > 78) {
    throw new Error("Enter a positive whole LAND amount (no fractions or exponent notation).");
  }
  const amount = BigInt(text);
  if (amount === 0n || amount > MaxUint256) {
    throw new Error("Enter a positive whole LAND amount within uint256 range.");
  }
  return amount;
}

export function parseUsdcAmount(value) {
  const text = value.trim();
  if (!/^[0-9]+(?:\.[0-9]{1,6})?$/.test(text) || text.length > 85) {
    throw new Error("Enter a positive mock USDC amount with at most 6 decimal places.");
  }
  const amount = parseUnits(text, 6);
  if (amount === 0n || amount > MaxUint256) {
    throw new Error("Enter a positive mock USDC amount within uint256 range.");
  }
  return amount;
}
