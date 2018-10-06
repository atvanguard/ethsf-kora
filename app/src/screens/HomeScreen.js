import React from 'react'

import ListProposals from './ListProposals';
import CreateProposal from './CreateProposal';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div>
        <ListProposals />
        <CreateProposal />
      </div>
    )
  }
}