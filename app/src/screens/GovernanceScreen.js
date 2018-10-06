import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { RequestQRCode, RequestData } from '@bloomprotocol/share-kit'

export default class GovernanceScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      requestData: {
        action: function() { console.log('got the response back') }, // TODO: this navigation on callback
        token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
        url: 'https://bloom.co/api/receiveData',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['full-name', 'phone', 'email'],
      }
    }

    this.handleBloomAuthenticate = this.handleBloomAuthenticate.bind(this);
  }

  componentDidMount() {
    let eipDiv = document.getElementById('eip999');
  }

  handleBloomAuthenticate(e) {
    console.log('hello -> ', e);
  }

  render() {
    return (
      <Grid className="App-governance">
        <Row className="eip" id="eip999">
          <Row className="eip-overview">
            <p>eip: 999</p>
            <p>title: Restore Contract Code at 0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4</p>
            <p>author: Afri Schoedon (@5chdn)</p>
            <p>discussions-to: https://ethereum-magicians.org/t/eip-999-restore-contract-code-at-0x863df6bfa4/130</p>
            <p>status: Draft</p>
            <p>type: Standards Track</p>
            <p>category: Core</p>
            <p>created: 2018-04-04</p>
          </Row>

          <Row className="eip-summary">
            <p className="lead">
              This document proposes to restore the contract code of the `WalletLibrary`
              contract at `0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4` with a patched version.
              The contract was accidentally self-destructed and renders a significant amount
              of Ether inaccessible.
            </p>
          </Row>

          <Row className="eip-abstract">

          </Row>

          <Row className="eip-specification">

          </Row>

          <Row className="eip-rationale">
            <RequestQRCode requestData={this.state.requestData} size={200} />
          </Row>

        </Row>

        <div className="actions">
          <Button bsStyle="primary" className="bloom-authenticate" onClick={this.handleBloomAuthenticate}> Identify with Bloom </Button>
          <Button bsStyle="success"> Comment </Button>
        </div>
      </Grid>
    );
  }
}
