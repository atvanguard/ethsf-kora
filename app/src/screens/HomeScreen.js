import React from 'react'

import ListProposals from './ListProposals';
import CreateProposal from './CreateProposal';
import { RequestQRCode, RequestData, Action } from '@bloomprotocol/share-kit'

import { Button, Modal } from 'react-bootstrap';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      bloom: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    setTimeout(this.setState({
      bloom: true
    }) , 3000)
  }

  toggleModal() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const defaultData = {
      action: Action.attestation,
      token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
      url: 'https://0f68c00b.ngrok.io/receiveBloomData',
      // url: 'https://bloom.co/receiveBloomData',
      org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
      org_name: 'MahDemocracy',
      org_usage_policy_url: 'https://bloom.co/legal/terms',
      org_privacy_policy_url: 'https://bloom.co/legal/privacy',
      types: ['email', 'phone'],
    }

    return (
      <div>
        <ListProposals />

        <Modal show={this.state.show} onHide={this.toggleModal}>
           <Modal.Header closeButton>
             <Modal.Title>Modal heading</Modal.Title>
           </Modal.Header>
           <Modal.Body>
            {
              this.state.bloom
              ?
              <CreateProposal />
              :
              <RequestQRCode requestData={defaultData} size={250} />
            }
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.toggleModal}>Close</Button>
           </Modal.Footer>
         </Modal>

        <button onClick={this.toggleModal} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4a6dff', position: 'fixed', bottom: 0, right: 20, height: 50, width: 50, borderRadius: '50%' }}>
           <h4>+</h4>
        </button>
      </div>
    )
  }
}
