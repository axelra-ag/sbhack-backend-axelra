pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./MOB.sol";


contract BikeToWork {

    using SafeMath for uint256;

    address public contractOwner;
    MOB mobTokenContract;

    constructor() public {
        contractOwner = msg.sender;
    }

    function setTokenContract (address contractAddress ) public {
        require(msg.sender == contractOwner, "not allowed");
        mobTokenContract = MOB(contractAddress);
    }

    struct Station {
        uint256 stationId;
        bytes32 secretHash;
    }
    mapping(uint256 => Station) stations;
    uint256[] stationIds;

    mapping(uint256 => mapping(uint256 => uint256)) distances;
    uint256 rewardPerDistance;

    function createStation(bytes32 _secretHash, uint256[] _stationIds, uint256[] _distances) public {
        require(msg.sender == contractOwner, "not allowed");

        Station storage station = stations[stationIds.length];
        station.stationId = stationIds.length;
        station.secretHash = _secretHash;
        stationIds.push(stationIds.length);

        for (uint i=0; i < _stationIds.length; i++) {
            setDistances(station.stationId, _stationIds[i], _distances[i]);
        }
    }

    function setDistances(uint256 _stationId1, uint256 _stationId2, uint256 distance) public {
        require(msg.sender == contractOwner, "not allowed");

        distances[_stationId1][_stationId2] = distance;
        distances[_stationId2][_stationId1] = distance;
    }

    function setRewardPerDistance(uint256 _rewardPerDistance) public {
        require(msg.sender == contractOwner, "not allowed");

        rewardPerDistance = _rewardPerDistance;
    }

    struct Ride {
        address rider;
        uint256 rideId;
        uint256 startStationId;
        uint256 endStationId;
    }
    mapping(uint256 => Ride) rides;
    uint256[] rideIds;


    event RideStarted (uint256 rideId, address rider, uint256 startStationId);
    function startRide (uint256 _startStationId, bytes32 _startStationSecretHash) public {
        require(stations[_startStationId].secretHash == _startStationSecretHash, "secret is not correct");
        uint256 id = rideIds.length;
        rides[id].rideId = id;
        rides[id].startStationId = _startStationId;
        rides[id].rider = msg.sender;

        emit RideStarted(id, msg.sender, _startStationId);
    }

    function startRide (uint256 _startStationId, bytes32 _startStationSecretHash, uint256 _endStationId) public {
        require(stations[_startStationId].secretHash == _startStationSecretHash, "secret is not correct");
        uint256 id = rideIds.length;
        rides[id].rideId = id;
        rides[id].startStationId = _startStationId;
        rides[id].rider = msg.sender;
        rides[id].endStationId = _endStationId;
    }

    event RideEnded (uint256 rideId, address rider, uint256 startStationId, uint256 endStationId, uint256 reward, uint256 distance);
    function endRide (uint256 _rideId, uint256 _endStationId, bytes32 _endStationSecretHash) public {
        require(stations[_endStationId].secretHash == _endStationSecretHash, "secret is not correct");

        Ride memory ride = rides[_rideId];

        require(ride.rider == msg.sender);
        ride.endStationId = _endStationId;
        // transfer tokens to user
        uint256 distance = distances[ride.startStationId][ride.endStationId];
        uint256 reward = SafeMath.mul(rewardPerDistance, distance);
        require(mobTokenContract.transfer(msg.sender, reward));

        emit RideEnded(_rideId, msg.sender, ride.startStationId, ride.endStationId, reward, distance);

    }

    function endRide (uint256 _rideId, bytes32 _endStationSecretHash) public {
        Ride memory ride = rides[_rideId];

        require(stations[ride.endStationId].secretHash == _endStationSecretHash, "secret is not correct");

        require(ride.rider == msg.sender);
        // transfer tokens to user
        uint256 distance = distances[ride.startStationId][ride.endStationId];
        uint256 reward = SafeMath.mul(rewardPerDistance, distance);
        require(mobTokenContract.transfer(msg.sender, reward));

        emit RideEnded(_rideId, msg.sender, ride.startStationId, ride.endStationId, reward, distance);
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

    mapping(uint256 => SponsoredCheckpoint) sponsoredCheckpoints;
    uint256[] checkpoints;


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



//
//    struct SponsoredChallenge {
//        uint256 id;
//        uint256 rewardPerDistance;
//        uint256 totalSponsoredAmount;
//
//        uint256 amountOfRuns;
//        bool roundTripOnSameDay;
//        uint256 durationInDays;
//        uint256 allowedNumberOfBreakDays;
//        State state;
//    }
//
//    struct EffectiveChallenge {
//        uint256 sponsoredChallengeId;  // the challenge id which the challenge belongs to
//        uint256 startStationId;
//        uint256 endStationId;
//        uint256 distanceInKm;
//
//        uint256[] startPointCheckinTimes;
//        uint256[] endPointCheckinTimes;
//    }
//
//    mapping(uint256 => SponsoredChallenge) sponsoredChallenges;
//    uint256[] challenges;
//    mapping(uint256 => EffectiveChallenge) effectiveChallenge;
//    uint256[] effChallenges;
//
//    function createSponsoredChallenge (
//        address _from,
//        uint256 _value,
//        uint256 _rewardPerDistance,
//    //        uint256 _totalSponsoredAmount,
//        uint256 _amountOfRuns,
//        bool _roundTripOnSameDay,
//        uint256 _durationInDays,
//        uint256 _allowedNumberOfBreakDays
//    ) public {
//
//        uint256 id;
//        if (challenges.length == 0)
//            id = 0;
//        else
//            id = sponsoredChallenges[(challenges.length-1)].id + 1;
//
//        SponsoredChallenge storage challenge = sponsoredChallenges[id];
//        challenge.id = id;
//        challenge.totalSponsoredAmount = _value;
//        challenge.rewardPerDistance = _rewardPerDistance;
//        challenge.amountOfRuns = _amountOfRuns;
//        challenge.roundTripOnSameDay = _roundTripOnSameDay;
//        challenge.durationInDays = _durationInDays;
//        challenge.allowedNumberOfBreakDays = _allowedNumberOfBreakDays;
//        challenge.state = State.ACTIVE;
//
//        challenges.push(challenge.id);
//    }


}
