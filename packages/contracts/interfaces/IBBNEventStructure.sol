// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Event Structure Interface.
* @author Daccred.
* @dev  This is the structure of any BBN Event, to
*       be used by the BBNEvent and the BBNRegistry contracts.
*/
interface IBBNEventStructure {
    /**
    * @dev Event struct.
    *
    * @param eventCurator       Event's curator, sent from the Registry
    *                           as msg.sender.
    * @param question           Event's question.
    * @param hash               Event's hash.
    * @param outcomes[]         Array of event outcomes.
    * @param resolved           Bool, true if resolved, false if not.
    * @param resolutionValue    Array index of the correct resolution value 
    *                           for the outcomes array.
    */
    struct Event {
        address eventCurator;
        string question;
        bytes32 hash;
        string[4] outcomes;
        bool resolved;
        uint8 resolutionValue;
        uint256 expiryDate;
    }
}