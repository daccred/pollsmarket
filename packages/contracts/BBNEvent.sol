// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {BBNEventERC721} from "./BBNEventERC721.sol";
import {IBBNEvent} from "./interfaces/IBBNEvent.sol";
import {IBBNEventStructure} from "./interfaces/IBBNEventStructure.sol";

/**
* @title BBN Event Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This NFT contract is deployed whenever a valid curator
*       lists a new event.
*       Every event is limited to one NFT contract and one Stake
*       question at a time, this question can have multiple outcomes
*       but in the end, only one can be correct.
*       Events can be resolved by either the curator or the admin.
*       Curator can resolve once, the admin can cancel or reresolve
*       the event.
*
*       This contract is callable by ONLY the BBNRegistry.
*/
abstract contract BBNEvent is 
IBBNEvent, 
IBBNEventStructure, 
BBNEventERC721 
{
    /// @dev Event struct mapping.
    Event public _event;
    /// @dev Owner Address.
    address private eventOwner;
    /// @dev Admin address.
    address private admin;
    /// @dev Registry address.
    address private registry;
    /// @dev Stakes Mapping.
    mapping(address => uint8) private stakes;

    /// @dev Emitted when a new Event is deployed.
    event NewEvent(Event __event);
    /// @dev Emitted when a user stakes.
    event Stake(address _address, uint256 value);

    /// @dev    Constructor sets the owner, maxSupply and expiry date of 
    ///         this particular Event
    constructor(
        address _admin,
        address _ownerAddress,
        address _pool,
        Event memory _newEvent,
        uint256 _maxSupply,
        uint256 _expiryDate
    ) 
    BBNEventERC721 (
        _ownerAddress,
        _pool,
        _maxSupply,
        _expiryDate
    )
    {
        /// @dev Make sure admin is a valid address.
        require(_admin != address(0),"0x0 Admin");
        /// @dev Set contract Event and delete the event from memory.
        _event = _newEvent;
        /// @dev Set event Owner.
        eventOwner = _ownerAddress;
        /// @dev Set registry.
        registry = msg.sender;
        /// @dev Set admin.
        admin = _admin;
    }
}