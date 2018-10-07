pragma solidity ^0.4.24;

contract Governance {

  struct Proposal {
    address owner;
    string dataHash;
    // uint256 endsAt; // dummy
    uint256 minTokensSpent;
    uint256 tokensSpent;
    mapping (address => uint256) balances;
    mapping (address => string) opinions;
  }

  uint256 public counter;
  uint256 constant deductTokens = 50;
  mapping(uint256 => Proposal) proposals;

  modifier onlyOwner(uint256 id, address sender) {
    Proposal storage proposal = proposals[id];
    require(proposal.owner == sender);
    _;
  }

  modifier validProposal(uint256 id) {
    Proposal storage proposal = proposals[id];
    require(proposal.owner != address(0));
    _;
  }

  modifier hasBalance(uint256 id, address sender, uint256 balance) {
    Proposal storage proposal = proposals[id];
    require(proposal.balances[sender] >= balance);
    _;
  }

  function newProposal(string dataHash, uint256 minTokensSpent) public {
    proposals[counter++] = Proposal(msg.sender, dataHash, minTokensSpent, 0 /* tokensSpent */);
  }

  function readProposal(uint256 id)
  public view
  validProposal(id)
  returns(string dataHash, address owner, uint256 minTokensSpent) {
    Proposal storage proposal = proposals[id];
    dataHash = proposal.dataHash;
    owner = proposal.owner;
    minTokensSpent = proposal.minTokensSpent;
  }

  function assignTokens(uint256 id, address _address, uint256 tokens)
  public
  validProposal(id) onlyOwner(id, msg.sender) {
    Proposal storage proposal = proposals[id];
    proposal.balances[_address] = tokens;
  }
  
  function voiceOpinion(uint256 id, string dataHash)
  public
  validProposal(id) hasBalance(id, msg.sender, deductTokens) {
    Proposal storage proposal = proposals[id];
    proposal.balances[msg.sender] -= deductTokens; // deduct a fixed amount based on the action
    proposal.tokensSpent += deductTokens;
    proposal.opinions[msg.sender] = dataHash;
    // if (proposal.tokensSpent >= proposal.minTokensSpent) forward to voting app
  }
}