pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./MOB.sol";


contract BikeToWork {

    using SafeMath for uint256;

    MOB mobTokenContract;

    struct SponsoredChallenge {
        uint256 id;
        uint256 rewardPerDistance;
        uint256 totalSponsoredAmount;

        uint256 amountOfRuns;
        bool roundTripOnSameDay;
        uint256 durationInDays;
        uint256 allowedNumberOfBreakDays;
        State state;
    }

    enum State {
        ACTIVE,
        FINISHED
    }

    struct SponsoredCheckpoint {
        uint256 id;
        uint256 rewardPerCheckin;
        uint256 amountOfRewards;
        bytes32 checkpointHash;
        State state;
    }

    struct Challenge {
        bytes32 startPoint;
        bytes32 endPoint;
        uint32 distanceInKm;

        bytes32[] checkIns;
    }
    
    mapping(uint256 => SponsoredChallenge) sponsoredChallenges;
    uint256[] challenges;
    mapping(uint256 => SponsoredCheckpoint) sponsoredCheckpoints;
    uint256[] checkpoints;

    function createSponsoredChallenge (
        address _from,
        uint256 _value,
        uint256 _rewardPerDistance,
//        uint256 _totalSponsoredAmount,
        uint256 _amountOfRuns,
        bool _roundTripOnSameDay,
        uint256 _durationInDays,
        uint256 _allowedNumberOfBreakDays
    ) public {

        uint256 id;
        if (challenges.length == 0)
            id = 0;
        else
            id = sponsoredChallenges[(challenges.length-1)].id + 1;

        SponsoredChallenge storage challenge = sponsoredChallenges[id];
        challenge.id = id;
        challenge.totalSponsoredAmount = _value;
        challenge.rewardPerDistance = _rewardPerDistance;
        challenge.amountOfRuns = _amountOfRuns;
        challenge.roundTripOnSameDay = _roundTripOnSameDay;
        challenge.durationInDays = _durationInDays;
        challenge.allowedNumberOfBreakDays = _allowedNumberOfBreakDays;
        challenge.state = State.ACTIVE;

        challenges.push(challenge.id);
    }

    function createSponsoredCheckpoint (address _from, uint256 _value, uint256 _rewardPerCheckin, uint256 _amountOfRewards, bytes32 _checkpointSecret) public {

        require(_value == SafeMath.mul(_rewardPerCheckin, _amountOfRewards), "not enough value saved to the contract.");

        uint256 id;
        if (checkpoints.length == 0)
            id = 0;
        else
            id = sponsoredCheckpoints[(checkpoints.length-1)].id + 1;

        SponsoredCheckpoint storage checkpoint = sponsoredCheckpoints[id];
        checkpoint.id = id;
        checkpoint.rewardPerCheckin = _rewardPerCheckin;
        checkpoint.amountOfRewards = _amountOfRewards;
        checkpoint.checkpointHash = keccak256(abi.encode(_checkpointSecret));
        checkpoint.state = State.ACTIVE;

        checkpoints.push(checkpoint.id);
    }
    
    function redeemCheckpointReward (uint256 _checkpointId, bytes32 _checkpointSecret) public {
        
        require(sponsoredCheckpoints[_checkpointId].checkpointHash == keccak256(abi.encode(_checkpointSecret)), "checkpoint secret not correct");

        // transfer tokens to user
        require(mobTokenContract.transfer(msg.sender, sponsoredCheckpoints[_checkpointId].rewardPerCheckin));
        
        sponsoredCheckpoints[_checkpointId].amountOfRewards = sponsoredCheckpoints[_checkpointId].amountOfRewards - 1;
        
        if (sponsoredCheckpoints[_checkpointId].amountOfRewards == 0)
            sponsoredCheckpoints[_checkpointId].state == State.FINISHED;
    }
}
