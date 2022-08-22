// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Curator Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev Contract allowing users to list new event.
*/
contract Curator {
    /// @dev Curator address mappings.
    mapping(address => bool) private curators;

    /// @dev Modifier to validate if an address is a valid curator.
    modifier isCurator() {
        /// @dev Require address is mapped to true.
        require(curators[msg.sender] == true, "!Curator");
        _;
    }

    /**
    * @dev Lists a new event.
    */
    function listNewEvent(
        string memory _eventName,
        uint256 _stakingAmount,
        uint256 _eventDeadline,
        uint256 _resolutionTime,
        uint256 _maximumTicketSupply,
        string[] memory _eventOutcomes
    ) public isCurator
    {

    }
}