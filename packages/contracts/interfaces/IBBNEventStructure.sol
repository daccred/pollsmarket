// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Event Structure Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  
*/
interface IBBNEventStructure {
    /// @dev Event struct.
    struct Event {
        string question;
        bytes32 hash;
        string[4] outcomes;
        bool resolved;
        uint8 resolutionValue;
    }
}