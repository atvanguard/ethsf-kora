import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import GovernanceScreen from './screens/GovernanceScreen';
import DiscussionScreen from './screens/DiscussionScreen';
import VotingScreen from './screens/VotingScreen';

import EmbarkJS from 'Embark/EmbarkJS';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      error: null,
      activeKey: 1,
      whisperEnabled: false,
      storageEnabled: false,
      blockchainEnabled: false
    };
  }

  componentDidMount() {
    EmbarkJS.onReady((err) => {
      this.setState({blockchainEnabled: true});
      if (err) {
        // If err is not null then it means something went wrong connecting to ethereum
        // you can use this to ask the user to enable metamask for e.g
        return this.setState({error: err.message || err});
      }

      EmbarkJS.Messages.Providers.whisper.getWhisperVersion((err, _version) => {
        if (err) {
          return console.log(err);
        }
        this.setState({whisperEnabled: true});
      });

      EmbarkJS.Storage.isAvailable().then((result) => {
        this.setState({storageEnabled: result});
      }).catch(() => {
        this.setState({storageEnabled: false});
      });
    });
  }

  _renderStatus(title, available) {
    let className = available ? 'pull-right status-online' : 'pull-right status-offline';
    return (
      <React.Fragment>
        {title}
        <span className={className}></span>
      </React.Fragment>
    );
  }

  handleSelect(key) {
    this.setState({ activeKey: key });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Ethereum Improvement Proposal #999</h1>
        </header>

        <div className="App-body">
          <DiscussionScreen />
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
