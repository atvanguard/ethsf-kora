import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { RequestQRCode, RequestData, Action } from '@bloomprotocol/share-kit'

export default class GovernanceScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleBloomAuthenticate = this.handleBloomAuthenticate.bind(this);
  }

  componentDidMount() {
    let eipDiv = document.getElementById('eip999');
  }

  handleBloomAuthenticate(e) {
    console.log('hello -> ', e);
  }

  renderDiscussionScreen() {
    this.props.renderDiscussionScreen();
  }

  render() {
    const defaultData = {
      action: Action.attestation,
      token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
      url: 'http://localhost:3000/api/bloomShareReceiveData',
      org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
      org_name: 'MahDemocracy',
      org_usage_policy_url: 'https://bloom.co/legal/terms',
      org_privacy_policy_url: 'https://bloom.co/legal/privacy',
      types: ['email'],
    }

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
            <h2> Summary </h2>
            <p >
              This document proposes to restore the contract code of the `WalletLibrary`
              contract at `0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4` with a patched version.
              The contract was accidentally self-destructed and renders a significant amount
              of Ether inaccessible.
            </p>
          </Row>

          <Row className="eip-abstract">
            <h2> Abstract </h2>
            <p >
              The `WalletLibrary` contract was used by the
              [Parity Wallet](https://www.parity.io/) to reduce gas costs for users deploying
              multi-signature wallets on the Ethereum blockchain. It contained basic
              functionality such as confirming or revoking multi-signature transactions for
              any wallet deployed that depends on this library. The
              [accidental self-destruction](https://github.com/paritytech/parity/issues/6995)
              of the library contract caused significant amounts of Ether and other assets
              owned by many different parties to be inaccessible. This proposal suggests
              restoring the `WalletLibrary` by a
              [patched](https://github.com/parity-contracts/0x863df6bfa4) version to allow the
              owners of the dependent multi-signature wallets regain access to their assets.
            </p>
          </Row>

          <Row className="eip-specification">
            <h2> Specification </h2>
            <p >
              The self-destructed contract code at
              [`0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4`](https://etherscan.io/address/0x863df6bfa4469f3ead0be8f9f2aae51c91a907b4#code)
              shall be replaced with a patched version of the
              [`walletLibrary.sol`](https://github.com/parity-contracts/0x863df6bfa4/blob/master/contracts/walletLibrary.sol)
              as reviewed, tested, and approved in
              [parity-contracts/0x863df6bfa4](https://github.com/parity-contracts/0x863df6bfa4):
            </p>
          </Row>

          <Row className="eip-rationale">
            <h2> Specification </h2>
            <RequestQRCode requestData={defaultData} size={400} />
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
