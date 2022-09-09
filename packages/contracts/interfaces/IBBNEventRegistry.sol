// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title BBN Event Registry Contract Interface.
* @author Daccred.
* @dev Interface guiding the registry for events.
*/
interface IBBNEventRegistry {
    /**
    * @dev  Sets the address of the pool from where the interactions
    *       with this event will be called.
    *
    * @param _pool Pool address.
    */
    function setPool(address _pool) external;

    /**
    * @dev  Sets the address of the resolution contract from where the resolutions
    *       with this event will be called.
    *
    * @param _resolutionContract Contract address.
    */
    function setResolutionContract(address _resolutionContract) external;

    /**
    * @dev  Returns the address of the pool.
    *
    * @return address Pool address.
    */
    function getPool() external view returns(address);

    /**
    * @dev Adds a valid curator to the curators list.
    */
    function addCurator(address _curator) external;

    /**
    * @dev  Deploys a new event, as set by the curator.
    *       Callable by only a valid curator.
    *
    * 
    * @param _question      Event question.
    * @param _outcomes      Array of event possible outcomes
    * @param _minStakeValue Lowest stake value.
    * @param _maxSupply     Maximum supply of NFTs.
    * @param _expiryDate    Expiry date of Staking.
    *
    * @return bytes32   Event hash
    * @return address   Event address.
    */
    function deployEvent(
        string memory _question,
        string[4] memory _outcomes,
        uint256 _minStakeValue,
        uint256 _maxSupply,
        uint256 _expiryDate
    ) external returns(bytes32, address);
}