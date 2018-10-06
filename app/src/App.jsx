import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import GovernanceScreen from './screens/GovernanceScreen';
import DiscussionScreen from './screens/DiscussionScreen';
import VotingScreen from './screens/VotingScreen';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'Governance'
    }

    this.discussionScreen = this.discussionScreen.bind(this);
  }

  discussionScreen() {
    this.setState({ screen: 'Discussion' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Ethereum Improvement Proposal #999
        </header>

        <div className="App-body">
          <GovernanceScreen renderDiscussionScreen = {this.discussionScreen}/>
        </div>
      </div>
    );
  }
}

export default App;


// {
//   switch (this.state.screen) {
//     case 'Governance':
//       return <GovernanceScreen />;
//     case 'Discussion':
//       return <DiscussionScreen />;
//     case 'Voting':
//       return <VotingScreen />;
//     default:
//       return null;
//   }
// }
