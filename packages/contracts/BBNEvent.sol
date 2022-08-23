// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {BBNEventERC721} from "./BBNEventERC721.sol";

/**
* @title BBN Event Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This NFT contract is deployed whenever a valid curator
*       lists a new event.
*       By architecture, it has a capped supply and a validity period, 
*       and mints on this contract WILL not be greater than the 
*       capped supply or done after the validity period.
*       However, the capped supply is open to be changed or increased.
*
*       Deploying a new event from the BBNRegistry deploys this contract
*       and the Event contract, and sets the pool address in both to 
*       to secure pool calls.
*/
contract BBNEvent is BBNEventERC721 {
    /// @dev    Constructor sets the owner, maxSupply and expiry date of 
    ///         this particular Event
    constructor(
        address _ownerAddress,
        address _pool,
        uint256 _maxSupply,
        uint256 _expiryDate
    ) 
    BBNEventERC721 (
        _ownerAddress,
        _pool,
        _maxSupply,
        _expiryDate
    )
    {}
}