// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IBBNEventRegistry} from "./interfaces/IBBNEventRegistry.sol";
import {IBBNEventStructure} from "./interfaces/IBBNEventStructure.sol";

import {BBNEvent} from "./BBNEvent.sol";

import {Guard} from "./utils/Guard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title BBN Event Registry Contract.
* @author Daccred.
* @dev  Registry contract, this contract deploys the Event.
*       This is a standalone contract.
*       Pool and resolutionContract is set first by owner.
*/
contract BBNEventRegistry is 
IBBNEventRegistry, 
IBBNEventStructure,
Ownable,
Guard
{
    /// @dev Pool address for interactions with every event.
    address private pool;
    /// @dev Address of the resolution contract.
    address private resolutionContract;
    /// @dev Map of valid curators.
    mapping(address => bool) private validCurators;

    /// @dev Validates that the caller is a valid Curator.
    modifier isValidCurator() {
        /// @dev Require callers address is set to true.
        require(validCurators[msg.sender] == true);
        _;
    }

    /**
    * @inheritdoc IBBNEventRegistry
    */
    function setPool(address _pool) public onlyOwner {
        /// @dev Require pool address is not a 0 address.
        require(_pool != address(0), "0x0 Pool");
        /// @dev Set pool.
        pool = _pool;
    }

    /**
    * @inheritdoc IBBNEventRegistry
    */
    function setResolutionContract(address _resolutionContract) 
    public 
    onlyOwner 
    {
        /// @dev Require resolution contract address is not a 0 address.
        require(_resolutionContract != address(0), "0x0 Resolution");
        /// @dev Set resolution contract address.
        resolutionContract = _resolutionContract;
    }

    /**
    * @inheritdoc IBBNEventRegistry
    */
    function getPool() public view onlyOwner returns(address) {
        /// @dev Return current pool.
        return pool;
    }

    /**
    * @inheritdoc IBBNEventRegistry
    */
    function addCurator(address _curator) public onlyOwner {
        /// @dev Require curator address is not a 0 address.
        require(_curator != address(0), "0x0 Curator");
        /// @dev Set map of the address to true;
        validCurators[_curator] = true;
    }

    /**
    * @inheritdoc IBBNEventRegistry
    */
    function deployEvent(
        string memory _question,
        string[4] memory _outcomes,
        uint256 _minStakeValue,
        uint256 _maxSupply,
        uint256 _expiryDate
    ) 
    public 
    isValidCurator 
    returns(bytes32, address)
    {
        /// @dev Require pool has been set.
        require(pool != address(0), "!Set Pool Address");
        /// @dev Require resolutionContract has been set.
        require(resolutionContract != address(0), "!Set Resolution Address");
        /// @dev Require time is set to future time.
        require(block.timestamp < _expiryDate, "Time > Expiry");
        /// @dev Require minimum stake is not 0.
        require(_minStakeValue != 0, "MinStake == 0");
        /// @dev Require max supplu is not 0.
        require(_maxSupply !=0, "MaxSupply == 0");
        /// @dev Hash event params to generate unique hash for this event.
        bytes32 eventHash = keccak256(abi.encodePacked(
            msg.sender,
            _question,
            // _outcomes, Cannot encodePack arrays.
            _minStakeValue,
            _maxSupply,
            _expiryDate
        ));

        /// @dev Set event parameters.
        Event memory _newRegEvent = Event(
            msg.sender,
            _question,
            eventHash,
            _outcomes,
            false,
            0,
            _expiryDate
        );

        /// @dev Deploy Event contract for this with salt.
        BBNEvent newBBNEvent = new BBNEvent{salt: eventHash}(
            owner(),
            msg.sender,
            pool,
            resolutionContract,
            _newRegEvent,
            _minStakeValue,
            _maxSupply,
            _expiryDate
        );

        /// @dev Return event hash and the address of the event.
        return (eventHash, address(newBBNEvent));
    }
}