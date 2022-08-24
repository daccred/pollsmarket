// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Event Structure Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This is the structure of any BBN Event, to
*       be used by the BBNEvent and the BBNRegistry contracts.
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