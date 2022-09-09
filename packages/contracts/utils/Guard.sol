// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Guard Contract.
* @author Daccred.
*/
abstract contract Guard {
    bool locked;
    
    modifier noReentrance {
        require(!locked, "Locked");
        locked = true;
        _;
        locked = false;
    }
}