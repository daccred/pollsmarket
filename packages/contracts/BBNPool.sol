// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IBBNPool} from "./interfaces/IBBNPool.sol";
import {IBBNEvent} from "./interfaces/IBBNEvent.sol";
import {Pausable} from "./utils/Pausable.sol";

/**
* @title BBN Event Pool Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  Pool from where any event staking can be interacted with.
*       This pool can be paused by the owner [admin].
*/
contract BBNPool is IBBNPool, Pausable {
    /**
    * @inheritdoc IBBNPool
    */
    function predictOutcome(
        address _eventAddress,
        bytes32 _hash,
        uint8 _predictedOutcome
    ) 
    external 
    payable
    whenNotPaused
    {
        /// @dev Require caller is not a 0 address.
        require(msg.sender != address(0), "0x0 Caller");
        /// @dev Require event address is not a 0 address.
        require(_eventAddress != address(0), "0x0 Event");
        /// @dev Require value is not 0.
        require(msg.value != 0, "Amount == 0");

        /// @dev    Stake at contract deployed to event address
        ///         with the value sent as value passed.
        IBBNEvent(_eventAddress).stake{value: msg.value}(
            msg.sender, 
            _hash, 
            _predictedOutcome
        );
        
        /// @dev Emit the {NewPrediction} event.
        emit NewPrediction(msg.sender, _hash);
    }
}