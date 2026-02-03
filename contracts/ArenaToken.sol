// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArenaToken is ERC20, Ownable {
    constructor() ERC20("AgentArena", "ARENA") Ownable(msg.sender) {
        _mint(msg.sender, 1000000000 * 10 ** decimals()); // 1 billion tokens
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
