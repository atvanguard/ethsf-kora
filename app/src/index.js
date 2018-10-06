import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';

import EmbarkJS from 'Embark/EmbarkJS';
import web3Util from './utils/Web3Util';

ReactDOM.render(
  <HashRouter>
    <App
      web3Util={web3Util}
    />
  </HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
