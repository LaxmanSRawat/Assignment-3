// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LandToken is ERC20 {
    address public immutable admin;
    address public pool;
    bool public supplyMinted;
    error NotImplemented();

    constructor(address adminAddress) ERC20("Land Token", "LAND") {
        // TODO(student): reject a zero admin. Start with ZERO supply.
        admin = adminAddress;
    }

    function setPool(address poolAddress) external {
        // TODO(student): admin only; set a nonzero pool contract exactly once.
        // Deployment wires this permission before the app initializes liquidity.
        revert NotImplemented();
    }

    function mintInitialSupply() external {
        // TODO(student): only the configured pool, exactly once.
        // Mint exactly 100 whole LAND directly to pool.
        // Record supplyMinted; never allow arbitrary amounts or later minting.
        revert NotImplemented();
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
