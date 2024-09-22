// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameToken is ERC20, ERC20Burnable, Ownable {
    // ERC20 constructor needs name and symbol, passed here
    constructor() ERC20("GameToken", "GTM") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Initial supply for the owner
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

contract GameNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // ERC721 constructor needs name and symbol, passed here
    constructor() ERC721("GameNFT", "GNFT") Ownable(msg.sender) {}

    function mintNFT(address to) external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}

contract GameCheckpoint is Ownable {
    GameToken public gameToken;
    GameNFT public gameNFT;

    struct Player {
        uint256 dummyPoints; // Internal dummy points
        bool hasLoggedIn;
    }

    struct Checkpoint {
        uint256 pointsRequired;
        bool solved;
    }

    mapping(address => Player) public players;
    mapping(uint256 => Checkpoint) public checkpoints;

    uint256 public initialDummyPoints = 500; // 100 in-game dummy points (not ERC20)
    uint256 public checkpointRewardERC20 = 20 * 10 ** 18; // Reward
    uint256 public nftRewardChance = 50; // 50% chance to get an NFT
    uint256 public explorationCost = 5; // Dummy points 

    event CheckpointSolved(address indexed player, uint256 checkpointId, uint256 rewardERC20, bool nftRewarded);

    constructor(address _gameToken, address _gameNFT) Ownable(msg.sender) {
        gameToken = GameToken(_gameToken);
        gameNFT = GameNFT(_gameNFT);
    }

    // first time Log and gets initial dummy points
    function login() external {
        require(!players[msg.sender].hasLoggedIn, "Player already logged in");

        players[msg.sender] = Player({
            dummyPoints: initialDummyPoints,
            hasLoggedIn: true
        });
    }

    // Add new checkpoints to the game
    function addCheckpoint(uint256 checkpointId, uint256 pointsRequired) external onlyOwner {
        require(!checkpoints[checkpointId].solved, "Checkpoint already exists");

        checkpoints[checkpointId] = Checkpoint({
            pointsRequired: pointsRequired,
            solved: false
        });
    }

    // Solve checkpoint and receive rewards
    function solveCheckpoint(uint256 checkpointId) external {
        require(players[msg.sender].hasLoggedIn, "Player has not logged in");
        require(!checkpoints[checkpointId].solved, "Checkpoint already solved");
        require(players[msg.sender].dummyPoints >= checkpoints[checkpointId].pointsRequired + explorationCost, "Not enough dummy points");

        // Deduct dummy points for exploration
        players[msg.sender].dummyPoints -= (checkpoints[checkpointId].pointsRequired + explorationCost);

        // Mark checkpoint as solved
        checkpoints[checkpointId].solved = true;

        // Mint ERC20 tokens as a reward for solving the checkpoint
        gameToken.mint(msg.sender, checkpointRewardERC20);

        // Randomly decide if an NFT is rewarded
        bool nftRewarded = random() < nftRewardChance;
        if (nftRewarded) {
            gameNFT.mintNFT(msg.sender);
        }

        emit CheckpointSolved(msg.sender, checkpointId, checkpointRewardERC20, nftRewarded);
    }

    // Simple random generator, using block.prevrandao for newer Ethereum forks
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 100;
    }

    // Function to allow players to view their current dummy points
    function getDummyPoints() external view returns (uint256) {
        return players[msg.sender].dummyPoints;
    }

    // Owner can set exploration cost
    function setExplorationCost(uint256 cost) external onlyOwner {
        explorationCost = cost;
    }
}
