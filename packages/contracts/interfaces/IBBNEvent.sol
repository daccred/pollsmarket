// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title BBN Event Contract Interface.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  
*/
interface IBBNEvent {
    function stake(address _staker, bytes32 _hash, uint8 _stake) external;
    function withdraw(address _staker) external payable;
    function resolveByCurator(address _curator) external;
    function resolveByAdmin(address _admin) external;
}