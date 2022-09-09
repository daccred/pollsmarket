// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {ERC721A} from "./utils/ERC721A.sol";
import {IBBNEventERC721} from "./interfaces/IBBNEventERC721.sol";
import {Guard} from "./utils/Guard.sol";

/**
* @title BBN Event NFT Contract.
* @author Daccred.
* @dev  This NFT contract is deployed whenever a valid curator
*       lists a new event.
*       By architecture, it has a capped supply and a validity period, 
*       and mints on this contract WILL not be greater than the 
*       capped supply or done after the validity period.
*
*       However, the capped supply is open to be changed or increased
*       only by the curator.
*
*       Deploying a new event from the BBNRegistry deploys this contract
*       and the Event contract, and sets the pool address in both to 
*       to secure pool calls.
*/
contract BBNEventERC721 is 
Guard,
IBBNEventERC721,
ERC721A
{
    /// @dev Pool address.
    address private pool;
    /// @dev Owner address.
    address private ownerAddress;
    /// @dev Capped supply.
    uint256 private maxSupply;
    /// @dev Capped supply.
    uint256 private currentSupply;
    /// @dev Expiry date.
    uint256 private _expiryDate_;

    /// @dev Modifier to secure contract calls from pool alone.
    /// @dev Pool is a future implementation.
    modifier onlyPool() {
        /// @dev Require that the transaction is sent by the pool.
        require(msg.sender == pool, "!Pool");
        _;
    }

    /// @dev    Constructor sets the owner, maxSupply and expiry date of 
    ///         this particular NFT
    constructor(
        address _ownerAddress,
        address _pool,
        uint256 _maxSupply,
        uint256 _expiryDate
    ) ERC721A("BBNEvent", "BBNEVENT") 
    {
        /// @dev Ensure that the owner address is not a zero address.
        require(_ownerAddress != address(0), "0x0 Address");
        /// @dev Ensure that the pool address is not a zero address.
        require(_pool != address(0), "0x0 Pool");
        /// @dev Set owner Address.
        ownerAddress = _ownerAddress;
        /// @dev Set pool address.
        pool = _pool;
        /// @dev Set Max supply.
        maxSupply = _maxSupply;
        /// @dev Set Expiry date.
        _expiryDate_ = _expiryDate;
    }

    /**
    * @inheritdoc IBBNEventERC721
    */
    function getMaxSuppply() public view returns(uint256) {
        return maxSupply;
    }

    /**
    * @inheritdoc IBBNEventERC721
    */
    function getCurrentSupply() public view returns(uint256) {
        return currentSupply;
    }

    /**
    * @dev  Function overload on the ERC721A contract, minting
    *       one token at a time to `_to`.
    *
    * @notice   On every new mint, the maxSupply increases by 1
    *           and once the deadline or limit is reached, it 
    *           will not mint again.
    *
    * @param _to Address to which 1 token will be minted.
    */
    function _mint(address _to) internal noReentrance {
        /// @dev Require the expiry date has not passed.
        require(block.timestamp < _expiryDate_, "Expired");
        /// @dev Require that minting one extra token will not extend the maxSupply.
        require((currentSupply + 1) <= maxSupply, "MaxSupply");
        /// @dev Increment the totalSupply by 1.
        unchecked {
            currentSupply ++;
        }
        /// @dev ERC721A safeMint to `to`.
        _safeMint(_to, 1);
    }

    /**
    * @dev  Increases the total supply of the Mintable NFTs on the
    *       contract by `_number`.
    *
    * @param _ownerAddress  Address of Event owner,
    *                       [passed as msg.sender from calling contract].
    * @param _supply        Integer value to increase the supply by.
    */
    function increaseMaxSupplyByNumber(address _ownerAddress, uint256 _supply) 
    internal
    {
        /// @dev Require _ownerAddress is the ownerAddress.
        require(_ownerAddress == ownerAddress, "!Event Owner");
        /// @dev Increment the maxSupply.
        maxSupply += _supply;    
    }
}