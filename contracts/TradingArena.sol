// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TradingArena is Ownable, ReentrancyGuard {
    struct Competition {
        uint256 id;
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 entryFee;
        uint256 prizePool;
        address[] participants;
        mapping(address => bool) hasEntered;
        mapping(address => int256) scores;
        bool isActive;
        bool isFinalized;
        address winner;
    }

    struct Agent {
        string name;
        address walletAddress;
        uint256 totalCompetitions;
        uint256 totalWins;
        uint256 totalEarnings;
    }

    IERC20 public arenaToken;
    uint256 public competitionCounter;
    uint256 public platformFeePercent = 5; // 5% platform fee

    mapping(uint256 => Competition) public competitions;
    mapping(address => Agent) public agents;
    address[] public registeredAgents;

    event CompetitionCreated(uint256 indexed competitionId, string name, uint256 entryFee, uint256 duration);
    event AgentEntered(uint256 indexed competitionId, address indexed agent, string agentName);
    event ScoreUpdated(uint256 indexed competitionId, address indexed agent, int256 score);
    event CompetitionFinalized(uint256 indexed competitionId, address indexed winner, uint256 prize);
    event AgentRegistered(address indexed agent, string name);

    constructor(address _arenaToken) Ownable(msg.sender) {
        arenaToken = IERC20(_arenaToken);
    }

    function registerAgent(string memory _name) external {
        require(bytes(agents[msg.sender].name).length == 0, "Agent already registered");
        
        agents[msg.sender] = Agent({
            name: _name,
            walletAddress: msg.sender,
            totalCompetitions: 0,
            totalWins: 0,
            totalEarnings: 0
        });
        
        registeredAgents.push(msg.sender);
        emit AgentRegistered(msg.sender, _name);
    }

    function createCompetition(
        string memory _name,
        uint256 _durationInHours,
        uint256 _entryFee
    ) external onlyOwner returns (uint256) {
        uint256 competitionId = competitionCounter++;
        Competition storage comp = competitions[competitionId];
        
        comp.id = competitionId;
        comp.name = _name;
        comp.startTime = block.timestamp;
        comp.endTime = block.timestamp + (_durationInHours * 1 hours);
        comp.entryFee = _entryFee;
        comp.prizePool = 0;
        comp.isActive = true;
        comp.isFinalized = false;

        emit CompetitionCreated(competitionId, _name, _entryFee, _durationInHours);
        return competitionId;
    }

    function enterCompetition(uint256 _competitionId) external nonReentrant {
        Competition storage comp = competitions[_competitionId];
        require(comp.isActive, "Competition not active");
        require(block.timestamp < comp.endTime, "Competition ended");
        require(!comp.hasEntered[msg.sender], "Already entered");
        require(bytes(agents[msg.sender].name).length > 0, "Agent not registered");

        // Transfer entry fee
        require(
            arenaToken.transferFrom(msg.sender, address(this), comp.entryFee),
            "Transfer failed"
        );

        comp.participants.push(msg.sender);
        comp.hasEntered[msg.sender] = true;
        comp.prizePool += comp.entryFee;
        agents[msg.sender].totalCompetitions++;

        emit AgentEntered(_competitionId, msg.sender, agents[msg.sender].name);
    }

    function updateScore(
        uint256 _competitionId,
        address _agent,
        int256 _score
    ) external onlyOwner {
        Competition storage comp = competitions[_competitionId];
        require(comp.isActive, "Competition not active");
        require(comp.hasEntered[_agent], "Agent not in competition");

        comp.scores[_agent] = _score;
        emit ScoreUpdated(_competitionId, _agent, _score);
    }

    function finalizeCompetition(uint256 _competitionId) external onlyOwner nonReentrant {
        Competition storage comp = competitions[_competitionId];
        require(comp.isActive, "Competition not active");
        require(block.timestamp >= comp.endTime, "Competition not ended");
        require(!comp.isFinalized, "Already finalized");

        // Find winner (highest score)
        address winner;
        int256 highestScore = type(int256).min;
        
        for (uint256 i = 0; i < comp.participants.length; i++) {
            address participant = comp.participants[i];
            if (comp.scores[participant] > highestScore) {
                highestScore = comp.scores[participant];
                winner = participant;
            }
        }

        require(winner != address(0), "No winner found");

        // Calculate platform fee and prize
        uint256 platformFee = (comp.prizePool * platformFeePercent) / 100;
        uint256 winnerPrize = comp.prizePool - platformFee;

        // Update winner stats
        agents[winner].totalWins++;
        agents[winner].totalEarnings += winnerPrize;

        // Transfer prizes
        require(arenaToken.transfer(winner, winnerPrize), "Winner transfer failed");
        require(arenaToken.transfer(owner(), platformFee), "Platform fee transfer failed");

        comp.isActive = false;
        comp.isFinalized = true;
        comp.winner = winner;

        emit CompetitionFinalized(_competitionId, winner, winnerPrize);
    }

    function getCompetitionParticipants(uint256 _competitionId) 
        external 
        view 
        returns (address[] memory) 
    {
        return competitions[_competitionId].participants;
    }

    function getAgentScore(uint256 _competitionId, address _agent) 
        external 
        view 
        returns (int256) 
    {
        return competitions[_competitionId].scores[_agent];
    }

    function getLeaderboard(uint256 _competitionId) 
        external 
        view 
        returns (address[] memory, int256[] memory) 
    {
        Competition storage comp = competitions[_competitionId];
        uint256 participantCount = comp.participants.length;
        
        address[] memory participants = new address[](participantCount);
        int256[] memory scores = new int256[](participantCount);

        for (uint256 i = 0; i < participantCount; i++) {
            participants[i] = comp.participants[i];
            scores[i] = comp.scores[comp.participants[i]];
        }

        return (participants, scores);
    }

    function getAllAgents() external view returns (address[] memory) {
        return registeredAgents;
    }

    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 10, "Fee too high");
        platformFeePercent = _newFee;
    }
}
