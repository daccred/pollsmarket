// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IBBNEventStructure} from "./IBBNEventStructure.sol";

/**
* @title BBN Event Resolution Contract Interface.
* @author Daccred.
* @dev Interface guiding the resolution of any event.
*/
interface IBBNEventResolution is IBBNEventStructure {
    /**
    * @dev  Allows the admin the right to resolve the event at
    *       `_eventAddress`, using the `_outcome` index.
    *       The `_hash` must be the same as the event hash.
    *
    * @param _eventAddress  Address of the event contract.
    * @param _hash          Event hash.
    * @param _outcome       Event outcome index.
    *                       Say an event has 4 possible outcomes,
    *                       for ease, the 4 outcomes will be voted in
    *                       0,1,2 and 3. 0 -> 1st outcome and so on...
    *                       
    *                       For resolution as well, a resolution `_outcome`
    *                       of 3 means, that the 4th possible outcome is the
    *                       right outcome.
    */
    function adminResolveOutcome(
        address _eventAddress,
        bytes32 _hash,
        uint8 _outcome
    ) external;

    /**
    * @dev  Allows the curator the right to resolve the event at
    *       `_eventAddress`, using the `_outcome` index.
    *       The `_hash` must be the same as the event hash.
    *
    * @param _eventAddress  Address of the event contract.
    * @param _hash          Event hash.
    * @param _outcome       Event outcome index.
    *                       Say an event has 4 possible outcomes,
    *                       for ease, the 4 outcomes will be voted in
    *                       0,1,2 and 3. 0 -> 1st outcome and so on...
    *                       
    *                       For resolution as well, a resolution `_outcome`
    *                       of 3 means, that the 4th possible outcome is the
    *                       right outcome.
    */
    function curatorResolveOutcome(
        address _eventAddress,
        bytes32 _hash,
        uint8 _outcome
    ) external;
}