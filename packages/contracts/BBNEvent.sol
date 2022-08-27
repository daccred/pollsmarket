// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {BBNEventERC721} from "./BBNEventERC721.sol";
import {IBBNEvent} from "./interfaces/IBBNEvent.sol";
import {IBBNEventStructure} from "./interfaces/IBBNEventStructure.sol";

/**
* @title BBN Event Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This NFT contract is deployed whenever a valid curator
*       lists a new event.
*       Every event is limited to one NFT contract and one Stake
*       question at a time, this question can have multiple outcomes
*       but in the end, only one can be correct.
*
*       Events can be resolved by either the curator or the admin.
*       Curator can resolve once, the admin can cancel or reresolve
*       the event.
*
*       This contract is deployable by ONLY the BBNRegistry. Subsequent
*       calls to staking are made by the BBNPoll. And Resolutions are called
*       by the BBNEventResolution contract.
*
* @notice   For ease, predicted outcomes are passed as array indexes for easier
*           resolution.
* @notice   This contract deploys the BBNEventERC721 contract and uses part of
*           its [this contracts] constructor arguments for the constructors of
*           the BBNEventERC721 contract.
*/
contract BBNEvent is IBBNEvent, BBNEventERC721 {
    /// @dev Event struct mapping.
    Event public _event;
    /// @dev Owner Address.
    address private curator;
    /// @dev Admin address.
    address private admin;
    /// @dev Registry address.
    address private registry;
    /// @dev Stakes Mapping.
    mapping(uint8 => address[]) private stakes;
    /// @dev minimum stake value.
    uint256 private minStakeValue;
    /// @dev Address of resolution contract.
    address private resolutionContract;

    /// @dev    Reward distribution.
    ///         When the contract is resolved, the
    ///         rewards are distributed to the stakers.
    mapping(address => uint256) private rewards;
    /// @dev    Admin reward.
    uint256 private adminRewards;
    /// @dev    Curator reward.
    uint256 private curatorRewards;

    /// @dev Emitted when a new Event is deployed.
    event NewEvent(Event __event);
    /// @dev Emitted when a user stakes.
    event Stake(address _address, uint256 value);
    /// @dev Emitted when event is resolved.
    event Resolve(address _address);

    /**
    * @dev  Constructor on deploy from the Registry takes in
    *       parameters that are being set to control the
    *       current Event contract.
    *
    * @param _admin         Address of admin.
    * @param _curator       Address of Event curator.
    * @param _pool          Address of pool for staking when time comes.
    * @param _newEvent      Event structure.
    * @param _minStakeValue Minimum stake value acceptable in this contract.
    * @param _maxSupply     Total number of stakes possible.
    * @param _expiryDate    Expirydate of this stake.
    */
    constructor(
        address _admin,
        address _curator,
        address _pool,
        address _resolutionContract,
        Event memory _newEvent,
        uint256 _minStakeValue,
        uint256 _maxSupply,
        uint256 _expiryDate
    ) 
    BBNEventERC721 (
        _curator,
        _pool,
        _maxSupply,
        _expiryDate
    )
    {
        /// @dev Make sure admin is a valid address.
        require(_admin != address(0),"0x0 Admin");
        /// @dev Set contract Event and delete the event from memory.
        _event = _newEvent;
        /// @dev Set event Owner.
        curator = _curator;
        /// @dev Set registry.
        registry = msg.sender;
        /// @dev Set admin.
        admin = _admin;
        /// @dev Set minimum stake value.
        minStakeValue = _minStakeValue;
        /// @dev Set Resolution contract.
        resolutionContract = _resolutionContract;
        /// @dev Emit the {NewEvent} event.
        emit NewEvent(_newEvent);
    }

    /// @dev Receive money from the pool.
    receive() external payable onlyPool {}

    /**
    * @inheritdoc IBBNEvent
    */
    function getEvent() public view returns(Event memory) {
        /// @dev Move the event to memory.
        Event memory _memEvent = _event;
        /// @dev Return Event.
        return _memEvent;
    }

    /**
    * @inheritdoc IBBNEvent
    */
    function stake(
        address _staker, 
        bytes32 _hash, 
        uint8 _outcome
    ) 
    external 
    payable 
    onlyPool
    noReentrance
    {
        /// @dev Require Staker is not curator.
        require(_staker != curator, "Staker == Curator");
        /// @dev Push event to memory.
        Event memory _memEvent = _event;
        /// @dev Require Event has not expired.
        require(block.timestamp < _memEvent.expiryDate, "Expired");
        /// @dev Require the amount sent is > than the minstake value.
        require(msg.value >= minStakeValue, "< Min Stake Value");
        /// @dev Ensure max has not been reached.
        require(
            (getCurrentSupply() + 1) <= getMaxSuppply(),
            "Max Stakes Reached"
        );
        /// @dev Require _staker is not a zero address.
        require(_staker != address(0), "0x0 Staker");
        /// @dev Validate hash passed is event hash.
        require(_hash == _memEvent.hash, "!Event Hash");
        /// @dev Requie event has not been resolved.
        require(!_memEvent.resolved, "Event Resolved");
        /// @dev    Ensure that the _stake outcome is within the
        ///         outcome values.
        require(
            _outcome <= _memEvent.outcomes.length,
            "!Outcome"
        );
        /// @dev Mint token to address.
        _mint(_staker);
        /// @dev Push to map.
        stakes[_outcome].push(_staker);
        /// @dev Emit {Stake} event.
        emit Stake(_staker, msg.value);
    }

    /**
    * @inheritdoc IBBNEvent
    */
    function resolveByAdmin(address _admin, uint8 _outcome) 
    external
    {
        /// @dev Require the caller is the resolution contract.
        require(msg.sender == resolutionContract, "!Resolver.");
        /// @dev Require that `_admin` is admin address.
        require(_admin == admin, "!Admin");
        /// @dev Require Event has expired.
        require(block.timestamp >= _event.expiryDate, "!Expired");
        /// @dev    Ensure that the _stake outcome is within the
        ///         outcome values.
        require(
            _outcome <= _event.outcomes.length,
            "!Outcome"
        );
        /// @dev Set the event resolution value to outcome.
        _event.resolutionValue = _outcome;
        /// @dev Calculate and distribute rewards.
        /// @notice Whenever the event outcome is changed, the
        ///         rewards are redistributed.
        calculateRewards(_outcome);
        /// @dev Set resolved to true.
        _event.resolved = true;
        /// @dev Emit the {Resolve} event.
        emit Resolve(_admin);
    }
    
    /**
    * @inheritdoc IBBNEvent
    */
    function resolveByCurator(address _curator, uint8 _outcome) 
    external
    {
        /// @dev Require the caller is the resolution contract.
        require(msg.sender == resolutionContract, "!Resolver.");
        /// @dev Require `_curator` is the curator.
        require(_curator == curator, "!Curator");
        /// @dev Require Event has expired.
        require(block.timestamp >= _event.expiryDate, "!Expired");
        /// @dev Require that the event is not yet resolved.
        require(_event.resolved == false, "Resolved Already");
        /// @dev    Ensure that the _stake outcome is within the
        ///         outcome values.
        require(
            _outcome <= _event.outcomes.length,
            "!Outcome"
        );
        /// @dev Set the event resolution value to outcome.
        _event.resolutionValue = _outcome;
        /// @dev Calculate and distribute rewards.
        /// @notice Whenever the event outcome is changed, the
        ///         rewards are redistributed.
        calculateRewards(_outcome);
        /// @dev Set resolved to true.
        _event.resolved = true;
        /// @dev Emit the {Resolve} event.
        emit Resolve(_curator);
    }

    /**
    * @dev  Calculates the rewards based on the outcome and distributes 
    *       or redistributes the rewards to all stakers.
    *
    * @notice   Due to the unspecified taxes for admin and curator,
    *           this function is still not yet approved.
    *
    * @param _outcome Outcome of event.
    */
    function calculateRewards(uint8 _outcome) private returns(bool) {
        uint8 adminTax = 2;         // Changeable.
        uint8 curatorTax = 1;       // Changeabe.
        uint256 totalFunds = address(this).balance;

        /// @dev Admin takes 2%.
        adminRewards = (adminTax * totalFunds) / 100;

        /// @dev Curator takes 1%.
        curatorRewards = (curatorTax * totalFunds) / 100;

        /// @dev Calculate for others.
        /// @dev Get remaining funds.
        uint256 remainingFunds = totalFunds - (adminRewards + curatorRewards);
        /// @dev Get the number of curators with the correct outcome.
        uint256 stakersWithCorrectOutcome = stakes[_outcome].length;
        /// @dev Divide the remaining funds equally among the stakers.
        uint256 individualRewards = remainingFunds / stakersWithCorrectOutcome;
        /// @dev Call the function to assign the funds to the users.
        distributeRewards(_outcome, individualRewards);
        /// @dev Return true;
        return true;
    }

    /**
    * @dev  Distributes or redistributes the rewards to all stakers.
    *
    * @notice   Due to the unspecified taxes for admin and curator,
    *           this function is still not yet approved.
    *
    * @param _outcome           Outcome of event.
    * @param _individualRewards Reward for each staker.
    */
    function distributeRewards(uint8 _outcome, uint256 _individualRewards) private {
        address[] memory _rewardees = stakes[_outcome];
        
        /// @dev Loop through all addresses and then reward each.
        for (uint8 i = 0; i < _rewardees.length; i++) {
            rewards[_rewardees[i]] = _individualRewards;
        }
    }

    /**
    * @inheritdoc IBBNEvent
    */
    function withdraw(address _staker) 
    external 
    // payable 
    onlyPool
    noReentrance
    {
        /// @dev Require Event has expired.
        require(block.timestamp >= _event.expiryDate, "!Expired");
        /// @dev Requie event has been resolved.
        require(_event.resolved, "Event !Resolved");
        /// @dev Require _staker is not a zero address.
        require(_staker != address(0), "0x0 Staker");
        /// @dev Require staker rewards is > 0.
        require(rewards[_staker] > 0, "0 Rewards");
        /// @dev Get staker's rewards.
        uint256 _stakerRewards = rewards[_staker];
        /// @dev Remove staker rewards.
        delete rewards[_staker];
        /// @dev Transfer to staker.
        payable(_staker).transfer(_stakerRewards);
    }

    /**
    * @inheritdoc IBBNEvent
    */
    function withdrawCurator(address _curator) 
    external 
    // payable 
    onlyPool
    noReentrance
    {
        /// @dev Require Event has expired.
        require(block.timestamp >= _event.expiryDate, "!Expired");
        /// @dev Requie event has been resolved.
        require(_event.resolved, "Event !Resolved");
        /// @dev Require _curator is the curator.
        require(_curator == curator, "!Curator");
        /// @dev Require curator rewards is > 0.
        require(curatorRewards > 0, "0 Rewards");
        /// @dev Get curator's rewards.
        uint256 _curatorRewards = curatorRewards;
        /// @dev Remove curator rewards.
        delete curatorRewards;
        /// @dev Transfer to curator.
        payable(curator).transfer(_curatorRewards);
    }

    /**
    * @dev Returns the amount `_staker` has after event has been resolved.
    */
    function getRewards(address _staker) 
    external 
    view
    returns(uint256)
    {
        /// @dev Require event has been resolved.
        require(_event.resolved, "Event !Resolved");
        /// @dev Return the rewards for the _staker.
        return rewards[_staker];
    }
}