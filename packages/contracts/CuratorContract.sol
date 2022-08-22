// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Curator Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev Contract allowing users to list new event.
*/
contract Curator {
    mapping(address => bool) private curators;

    modifier isCurator() {
        require(curators[msg.sender] == true, "!Curator");
        _;
    }

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