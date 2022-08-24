// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title BBN Event Contract Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  
*/
interface IBBNEvent {
    /**
    * @dev  Allows `_staker` to stake some amount of money that is
    *       > than the set `minStakeValue` deployed.
    *       This will mint a BBNEventERC721 token to `_staker`.
    *       This function is callable only by the pool contract where
    *       the staking on this event is done, _staker, _hash and _outcome 
    *       are sent from the pool, where _staker is `msg.sender`.
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
    * @dev  Whenever the admin wishes, he can resolve the contract's
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
    * @dev  Whenever the curator wishes, he can resolve the contract's
    *       event, on the condition that the contract has expired.
    *       Doing this, will trigger the calculateRewards() functions
    *       To distribute the fund to the stakers with the correct 
    *       outcome.
    *       
    * @notice   The curator can only resolve once, but on the situation 
    *           that the resolution is wrong, the admin can re-resolve
    *           the contract.
    *
    * @param _curator   Admin address, sent from Resolution contract
    *                   as msg.sender.
    * @param _outcome   Correct outcome for resolution.
    */
    function resolveByCurator(address _curator, uint8 _outcome) external;

    /**
    * @dev  Transfers `_stakers` rewards to its address. On the condition
    *       that the event has been brought to an end.    
    *
    * @param _staker Staker address, sent from Pool as msg.sender.
    */
    function withdraw(address _staker) external payable;

    /**
    * @dev  Transfers `_curators` rewards to its address. On the condition
    *       that the event has been brought to an end.    
    *
    * @param _curator Curator address, sent from Pool as msg.sender.
    */
    function withdrawCurator(address _curator) external payable;
}