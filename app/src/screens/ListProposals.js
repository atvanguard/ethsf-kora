import React from 'react';
import { Grid, Row, Col, Button, Badge } from 'react-bootstrap';
import { RequestQRCode, RequestData, Action } from '@bloomprotocol/share-kit';
import moment from 'moment';

import EmbarkJS from 'Embark/EmbarkJS';
import web3Util from '../utils/Web3Util';
import { Switch, Route, Link } from 'react-router-dom';
var FA = require('react-fontawesome');

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      eips: [
        {
          title: 'Which Aragon Nest Proposals should be given priority review?',
          tags: ['Ranking'],
          date: moment().format("MMM Do YY"),
          stakeholders: ['Ethereum Foundation'],
          dueDate: moment().format("MMM Do YY"),
          tokensSpent: 100,
          authorAddress: '0xA640D9A95ecE417e80F28021b26086215bF98D5F'
        },
        {
          title: 'Restore Contract Code at 0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4',
          tags: ['Hard Fork'],
          date: moment().format("MMM Do YY"),
          stakeholders: ['Ethereum Foundation'],
          dueDate: moment().format("MMM Do YY"),
          tokensSpent: 100,
          authorAddress: '0xA640D9A95ecE417e80F28021b26086215bF98D5F'
        },
        {
          title: 'Should we modify block mining to be ASIC resistant?',
          tags: ['Debate'],
          date: moment().format("MMM Do YY"),
          stakeholders: ['Ethereum Foundation'],
          dueDate: moment().format("MMM Do YY"),
          tokensSpent: 100,
          authorAddress: '0xA640D9A95ecE417e80F28021b26086215bF98D5F'
        }
      ]
    }
  }

  componentDidMount() {
    EmbarkJS.onReady(async () => {
      this.getProposals();
    })
  }

  async getProposals() {
    const counter = await web3Util.getCounter();
    console.log('counter', counter);
    const eips = []
    for(let i = 0; i < counter; i++) {
      const {proposal, details} = await web3Util.readProposal(i);
      console.log(proposal, details)
      eips.push({
        title: details.title,
        description: details.description,
        authorAddress: proposal.owner,
        tokensSpent: proposal.minTokensSpent,
        tags: ['Resource Allocation'],
        date: moment().format("MMM Do YY"),
        stakeholders: ['Ethereum Foundation'],
        dueDate: moment().format("MMM Do YY"),
      })
    }
    this.setState({eips})
  }


  render() {
    return (
      <Grid className="App-EIPS-list">
        {
          this.state.eips.map((eip, id) => {
            return (
              <Grid style={{ background: 'white', color: 'black', borderRadius: 10, marginTop: 30 }}>
                <Row style={{ boxShadow: `0 3 6 0 #8E54E9` }}>
                  <Col className="user" md={6} mdPush={3}>
                    <img src='/images/ecf.png' alt="ecf" style={{ height: 60, width: 100 }}/>
                    <Row>
                      <h3 style={{ padding: 10 }}>{eip.title}</h3>
                      <Badge style={{ borderRadius: 7, padding: 10, backgroundColor: '#8E54E9' }}>#{eip.tags[0]}</Badge>
                    </Row>

                    <Row>
                        {eip.description}
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <div style={{ padding: 30 }}> Submitted By: {eip.authorAddress} </div>
                </Row>
                <Row className="signaling-actions" style={{ display: 'flex', width: '100%', padding: 30, justifyContent: 'center', alignItems: 'flexEnd', color: 'white' }}>
                  <Col md={5}>
                    <Badge style={{ flex: 1, borderRadius: 7, margin: 5, padding: 10, backgroundColor: '#4a6dff' }}> <FA name="person" /> {eip.stakeholders[0]} </Badge>
                    <Badge style={{ flex: 1, borderRadius: 7, margin: 5, padding: 10, backgroundColor: '#4a6dff' }}> <FA name="calendar" /> {eip.dueDate} </Badge>
                    <Badge style={{ flex: 1, borderRadius: 7, margin: 5, padding: 10, backgroundColor: '#4a6dff' }}> <FA name="calendar" /> {eip.tokensSpent} </Badge>
                  </Col>
                  <Col mdPush={1} md={5}>
                    <Link to={'/discussion/'+id}> View Discussion </Link>
                  </Col>
                </Row>
              </Grid>
            )
          })
        }
      </Grid>
    );
  }
}
