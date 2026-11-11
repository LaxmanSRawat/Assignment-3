// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {MockUSDC} from "./MockUSDC.sol";
import {LandToken} from "./LandToken.sol";

contract LandPool {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    IERC20 public immutable land;
    address public immutable admin;
    uint256 public currentYear;
    bool public liquidityInitialized;

    error NotImplemented();

    constructor(address usdcAddress, address landAddress, address adminAddress) {
        // TODO(student): reject zero addresses and identical token addresses.
        usdc = IERC20(usdcAddress);
        land = IERC20(landAddress);
        admin = adminAddress;
    }

    function initializeLiquidity() external {
        // TODO(student): admin only, Year 0, exactly once. Call mintInitialSupply()
        // on BOTH configured tokens, creating 1,000 mock USDC and 100 LAND
        // directly in this pool. Set liquidityInitialized atomically.
        // If either mint fails, both token supplies and this flag must roll back.
        // Use the token contracts' typed interfaces for these calls.
        revert NotImplemented();
    }

    function requestUsdc(uint256 usdcAmount) external {
        // TODO(student): admin only, after initialization, positive USDC BASE units.
        // Transfer exactly usdcAmount from reserves to msg.sender; never mint.
        // Reject requests above the available USDC balance without changing balances.
        // Repeat requests are allowed in either year, limited by remaining reserves.
        revert NotImplemented();
    }

    function pricePerLand() public view returns (uint256) {
        // TODO(student): return 1 * 10**6 at Year 0, 5 * 10**6 at Year 5.
        // Return mock USDC BASE UNITS per whole LAND, never a floating value.
        revert NotImplemented();
    }

    function buy(uint256 landAmount) external {
        // TODO(student): liquidity initialized, Year 0 only, positive quantity, enough LAND.
        // Payment = whole LAND quantity * pricePerLand() (USDC base units).
        // Take approved USDC from msg.sender and send LAND in ONE transaction.
        // Use SafeERC20; any failed leg must revert the entire swap.
        revert NotImplemented();
    }

    function advanceFiveYears() external {
        // TODO(student): admin only, liquidity initialized, Year 0 -> Year 5 exactly once.
        // Change only the phase; neither token should move.
        revert NotImplemented();
    }

    function sell(uint256 landAmount) external {
        // TODO(student): liquidity initialized, Year 5 only, positive quantity, enough USDC.
        // Take approved LAND from msg.sender, then pay USDC atomically.
        // No arbitrary tokens, variable market prices, or on-chain reset.
        revert NotImplemented();
    }
}
