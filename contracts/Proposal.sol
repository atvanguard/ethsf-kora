pragma solidity ^0.4.24;

contract Proposal {
  struct Proposal {
    address owner;
    string question;
    string description;
    string emailSuffix;
    uint8 discussionTemplate;
    mapping (address => uint256) balances;
  }

  uint256 counter;
  mapping(uint256 => Proposal) proposals;

  modifier onlyOwner(uint256 id, address sender) {
    Proposal storage proposal = proposals[id];
    require(proposal.owner == sender);
    _;
  }

  function newProposal(string question, string description, string emailSuffix, uint8 discussionTemplate) {
    proposals[counter++] = Proposal(msg.sender, question, description, emailSuffix, discussionTemplate);
  }

  function readProposal(uint256 id) returns(string question, string description, string emailSuffix, uint8 discussionTemplate) {
    Proposal storage proposal = proposals[id];
    return (proposal.question, proposal.description, proposal.emailSuffix, proposal.discussionTemplate);
  }

  function assignTokens(uint256 id, address _address, uint256 tokens) onlyOwner(id, msg.sender) {
    Proposal storage proposal = proposals[id];
    proposal.balances[_address] = tokens;
  }
}