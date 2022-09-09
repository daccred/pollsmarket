// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IBBNEvent} from "./interfaces/IBBNEvent.sol";
import {IBBNEventResolution} from "./interfaces/IBBNEventResolution.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title BBN Event Resolution Contract.
* @author Daccred.
* @dev  Contract for the resolution of any BBN Event deployed 
*       to any address.
*
*       NB: Owner == Admin.
*       NB: This contract only resolves events, and has no bonds with 
*       other external contracts via constructor arguments.
*/
contract BBNEventResolution is IBBNEventResolution, Ownable {
    /**
    * @inheritdoc IBBNEventResolution
    */
    function adminResolveOutcome(
        address _eventAddress,
        bytes32 _hash,
        uint8 _outcome
    ) public onlyOwner 
    {
        /// @dev Require that event address is not a 0 address.
        require(_eventAddress != address(0), "0x0 Event Address");

        /// @dev Push Event struct at that address to memory for reading.
        Event memory _resEvent = IBBNEvent(_eventAddress).getEvent();
        
        /// @dev Require that event's hash is the same with passed hash.
        require(_resEvent.hash == _hash, "!Hash");
        /// @dev Require that outcome is within range.
        require(_outcome <= _resEvent.outcomes.length, "!Outcome");

        /// @dev Call resolution of event at that address for admin.
        IBBNEvent(_eventAddress).resolveByAdmin(msg.sender, _outcome);
    }

    /**
    * @inheritdoc IBBNEventResolution
    */
    function curatorResolveOutcome(
        address _eventAddress,
        bytes32 _hash,
        uint8 _outcome
    ) public 
    {
        /// @dev Require that event address is not a 0 address.
        require(_eventAddress != address(0), "0x0 Event Address");

        /// @dev Push Event struct at that address to memory for reading.
        Event memory _resEvent = IBBNEvent(_eventAddress).getEvent();

        /// @dev Require the caller is the event's curator.
        require(msg.sender == _resEvent.eventCurator, "!Curator");
        /// @dev Require that event's hash is the same with passed hash.
        require(_resEvent.hash == _hash, "!Hash");
        /// @dev Require that outcome is within range.
        require(_outcome <= _resEvent.outcomes.length, "!Outcome");

        /// @dev Call resolution of event at that address for curator.
        IBBNEvent(_eventAddress).resolveByCurator(msg.sender, _outcome);
    }
}