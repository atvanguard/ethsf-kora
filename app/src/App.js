import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import HomeScreen from './screens/HomeScreen';
import DiscussionScreen from './screens/DiscussionScreen';

import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" style={{ color: 'white' }}> Home </Link>
          <Link to="/discussion" style={{ color: 'white' }}> Discussion </Link>
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/discussion' component={DiscussionScreen} />
          </Switch>
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
