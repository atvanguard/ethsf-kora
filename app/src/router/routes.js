// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router'

import App from '../App';
import GovernanceScreen from '../screens/GovernanceScreen';
import DiscussionScreen from '../screens/DiscussionScreen';
import VotingScreen from '../screens/VotingScreen';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/governance" component={GovernanceScreen} />
    <Route path="/discussion" component={GovernanceScreen} />
    <Route path="/voting" component={VotingScreen} />
  </Router>
);

export default Routes;
