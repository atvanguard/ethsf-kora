pragma solidity ^0.4.24;

contract Governance {

  struct Balance {
    uint256 balance;
    string email;
  }

  struct Proposal {
    address owner;
    string dataHash;
    // uint256 endsAt; // dummy
    uint256 minTokensSpent;
    uint256 tokensSpent;
    mapping (address => Balance) balances;
    mapping (address => string) opinions;
  }

  uint256 public counter;
  // uint256 constant deductTokens = 50;
  uint256 constant deductTokens = 25;
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
    require(proposal.balances[sender].balance >= balance);
    _;
  }

  function newProposal(string dataHash, uint256 minTokensSpent) public {
    proposals[counter++] = Proposal(msg.sender, dataHash, minTokensSpent, 0 /* tokensSpent */);
  }

  function readProposal(uint256 id)
  public view
  validProposal(id)
  returns(string dataHash, address owner, uint256 minTokensSpent, uint256 addressBalance, string email) {
    Proposal storage proposal = proposals[id];
    dataHash = proposal.dataHash;
    owner = proposal.owner;
    minTokensSpent = proposal.minTokensSpent;
    addressBalance = proposal.balances[msg.sender].balance;
    email = proposal.balances[msg.sender].email;
  }

  function assignTokens(uint256 id, address _address, string email, uint256 tokens)
  public
  validProposal(id) {
  // validProposal(id) onlyOwner(id, msg.sender) {
    Proposal storage proposal = proposals[id];
    proposal.balances[_address] = Balance(tokens, email);
  }
  
  function voiceOpinion(uint256 id, string newDataHash)
  public
  validProposal(id) hasBalance(id, msg.sender, deductTokens) {
    Proposal storage proposal = proposals[id];
    proposal.balances[msg.sender].balance -= deductTokens; // deduct a fixed amount based on the action
    proposal.tokensSpent += deductTokens;
    proposal.dataHash = newDataHash;
    // proposal.opinions[msg.sender] = dataHash;
    // if (proposal.tokensSpent >= proposal.minTokensSpent) forward to voting app
  }
}