import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import GovernanceScreen from './screens/GovernanceScreen';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'Governance'
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Ethereum Improvement Proposal #999
        </header>

        <div className="App-body">
          <GovernanceScreen />
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
