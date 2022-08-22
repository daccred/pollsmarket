// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {ERC721A} from "./utils/ERC721A.sol";

/**
* @title BBN Event NFT Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev Minted to every curator who lists an event.
*/
contract BBNEventERC721 is ERC721A {
    constructor(string memory name_, string memory symbol_)
    ERC721A(name_, symbol_)
    {}
}