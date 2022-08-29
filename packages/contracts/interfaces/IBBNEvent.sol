// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IBBNEventStructure} from "./IBBNEventStructure.sol";

/**
* @title BBN Event Contract Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This interface controls the functionalities
*       of each BBNEvent contract.
*/
interface IBBNEvent is IBBNEventStructure {
    /**
    * @dev Returns the Event struct.
    * 
    * @return Event Event struct.
    */
    function getEvent() external view returns(Event memory);

    /**
    * @dev Returns the total funds staked on this event contract.
    * 
    * @return uint256 Total stakes.
    */
    function getTotalEventStakes() external view returns(uint256);

    /**
    * @dev  Allows `_staker` to stake some amount of money that is
    *       GT the set `minStakeValue` deployed.
    *       This will mint a BBNEventERC721 token to `_staker`.
    *       This function is callable only by the Pool contract where
    *       the staking on this event is done.
    *       _staker, _hash and _outcome are sent from the Pool, 
    *       where _staker is `msg.sender`.
    *
    * @param _staker    Address staking some funds.
    * @param _hash      Hash of event.
    * @param _outcome   Uint value of stake. Stake is an array, so the index
    *                   will be used.
    */
    function stake(
        address _staker, 
        bytes32 _hash, 
        uint8 _outcome
    ) external payable;

    /**
    * @dev  Whenever the admin wishes, it can resolve the contract's
    *       event, on the condition that the contract has expired.
    *       Doing this, will trigger the calculateRewards() functions
    *       To distribute the fund to the stakers with the correct 
    *       outcome.
    *
    * @param _admin     Admin address, sent from Resolution contract
    *                   as msg.sender.
    * @param _outcome   Correct outcome for resolution.
    */
    function resolveByAdmin(address _admin, uint8 _outcome) external;

    /**
    * @dev  Whenever the curator wishes, it can resolve the contract's
    *       event, on the condition that the contract has expired.
    *       Doing this, will trigger the calculateRewards() functions
    *       To distribute the fund to the stakers with the correct 
    *       outcome.
    *       
    * @notice   The curator can only resolve once, but on the situation 
    *           that the resolution is wrong, the admin can re-resolve
    *           the contract.
    *
    * @param _curator   Curator address, sent from Resolution contract
    *                   as msg.sender.
    * @param _outcome   Correct outcome for resolution.
    */
    function resolveByCurator(address _curator, uint8 _outcome) external;

    /**
    * @dev  Transfers `_staker`'s rewards to its address. On the condition
    *       that the event has been brought to an end.
    *
    * @param _staker Staker address, sent from Pool as msg.sender.
    */
    function withdraw(address _staker) external;

    /**
    * @dev  Transfers `_curators` rewards to its address. On the condition
    *       that the event has been brought to an end.    
    *
    * @param _curator Curator address, sent from Pool as msg.sender.
    */
    function withdrawCurator(address _curator) external;
}