// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard{
    using SafeMath for uint256;
    IERC20 public stakingToken;
    IERC20 public rewardToken;

    uint public constant REWARD_RATE = 1e18;
    uint private totalStakedTokens;
    uint public rewardPerTokenStored;
    uint public lastUpdateTime;

    mapping(address=>uint) public stakedBalance;
    mapping(address=>uint) public rewards;
    mapping(address=>uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    constructor(address _stakingToken, address _rewardToken){
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }
    function rewardPerToken() public view returns(uint){
        if(totalStakedTokens == 0){
            return rewardPerTokenStored;
        }
        uint totalTime = block.timestamp.sub(lastUpdateTime);
        uint totalRewards = REWARD_RATE.mul(totalTime);
        return rewardPerTokenStored.add(totalRewards.mul(1e18).div(totalStakedTokens)); 
    }
    function earned(address account) public view returns (uint){
        return (stakedBalance[account]).mul((rewardPerToken().sub(userRewardPerTokenPaid[account])));
    }
    modifier updateReward(address account){
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] =  rewardPerTokenStored;
        _;
    }
    function stake(uint amount ) external nonReentrant updateReward(msg.sender){
        require(amount>0,"Staking amount must be greater than zero");
        totalStakedTokens += amount;
        stakedBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);

        bool success = stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success,"Transfer Failed");
    }  
    function withdraw(uint amount ) external nonReentrant updateReward(msg.sender){
        require(amount>0,"Staking amount must be greater than zero");
        totalStakedTokens -= amount;
        stakedBalance[msg.sender] -= amount;
        emit Withdrawn(msg.sender, amount);

        bool success = stakingToken.transfer(msg.sender, amount);
        require(success,"Transfer Failed");
    }
    function getReward() external nonReentrant updateReward(msg.sender){
        uint reward = rewards[msg.sender];
        require(reward>0,"No reward is claimed: No rewards available!");
        rewards[msg.sender] = 0;
        emit RewardsClaimed(msg.sender,reward);

        bool success = rewardToken.transfer(msg.sender, reward);
        require(success,"Transfer Failed");
    }
}