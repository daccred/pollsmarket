// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title BBN Event NFT Contract Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This interface controls the NFT contract deployed
*       alongside any event listed by a curator.
*       [Ref:: BBNEventERC721.sol]
*/
interface IBBNEventERC721 {
    /**
    * @dev  Return the maxSupply.
    *
    * @return uint256 maxSupply.
    */
    function getMaxSuppply() external view returns(uint256);

    /**
    * @dev  Return the currentSupply.
    *
    * @return uint256 currentSupply.
    */
    function getCurrentSupply() external view returns(uint256);

    /**
    * @dev  Increases the total supply of the Mintable NFTs on the
    *       contract by `_number`.
    *
    * @param _ownerAddress  Address of Event owner.
    * @param _supply        Integer value to increase the supply by.
    */
    function increaseMaxSupplyByNumber(address _ownerAddress, uint256 _supply) 
    external;
}