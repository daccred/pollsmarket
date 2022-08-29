// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IBBNEventStructure} from "./IBBNEventStructure.sol";

/**
* @title BBN Event Pool Contract Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  Interface guiding the pool from where any event
*       staking can be interacted with.
*/
interface IBBNPool is IBBNEventStructure {
    /// @dev Emitted when a new Prediction is made.
    event NewPrediction(address indexed _address, bytes32 indexed _hash);

    /**
    * @dev Returns the event data at the given `_eventAddress`.
    *
    * @param _eventAddress Address of event.
    *
    * @return Event Event struct.
    */
    function getEventDataFromEvent(address _eventAddress) 
    external 
    view 
    returns(Event memory);

    /**
    * @dev Returns the total funds staked at the given `_eventAddress`.
    *
    * @param _eventAddress Address of event.
    *
    * @return uint256 Contract funds staked.
    */
    function getTotalStakesAtEvent(address _eventAddress) 
    external 
    view 
    returns(uint256);

    /**
    * @dev  Allows the caller to predict any event
    *       at `_eventAddress`. The condition being
    *       that the `_hash` is the event hash at
    *       the deployment address of the event.
    *       [This is validated in the BBNEvent] contract.
    *       Emits the {NewPrediction} event.
    *
    * @param _eventAddress      Address of event where this stake 
    *                           is sent to.
    * @param _hash              Event hash at event address.
    * @param _predictedOutcome  User's array index of the predicted
    *                           outcome.
    */
    function predictOutcome(
        address _eventAddress,
        bytes32 _hash,
        uint8 _predictedOutcome
    ) external payable;
}