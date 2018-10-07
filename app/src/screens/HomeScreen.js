import React from 'react';
import { Grid, Row, Col, Button, Badge } from 'react-bootstrap';
import { RequestQRCode, RequestData, Action } from '@bloomprotocol/share-kit';
import moment from 'moment';
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

  render() {
    return (
      <Grid className="App-EIPS-list">
        {
          this.state.eips.map(eip => {
            return (
              <Grid style={{ background: 'white', borderRadius: 10, marginTop: 30, color: 'black' }}>
                <Row style={{ boxShadow: `0 3 6 0 #cfd8ed` }}>
                  <Col className="overview">
                    <h1 style={{ padding: 10 }}>{eip.title}</h1>
                    <h2 style={{ padding: 10 }}>{eip.authorAddress}</h2>
                    <Badge style={{ flex: 1, borderRadius: 7, height: 60, width: 140, backgroundColor: '#cfd8ed', marginLeft: 5 }}> <FA name="rocket" /> <h2>{eip.tags[0]}</h2></Badge>
                  </Col>
                </Row>
                <Row className="badges" style={{ display: 'flex', width: '100%', padding: 30, alignItems: 'flexEnd' }}>
                  <Badge style={{ display: 'flex', flex: 1, borderRadius: 7, height: 60, width: 140, backgroundColor: '#cfd8ed', marginLeft: 5 }}> <FA name="rocket" /> <h3>{eip.stakeholders[0]}</h3></Badge>
                  <Badge style={{ display: 'flex', flex: 1, borderRadius: 7, height: 60, width: 140, backgroundColor: '#cfd8ed', marginLeft: 5 }}> <FA name="rocket" /> <h3>{eip.dueDate}</h3></Badge>
                  <Badge style={{ display: 'flex', flex: 1, borderRadius: 7, height: 60, width: 140, backgroundColor: '#cfd8ed', marginLeft: 5 }}> <FA name="rocket" /> <h3>{eip.tokensSpent}</h3></Badge>
                  <button style={{ display: 'flex', flex: 1, borderRadius: 7, height: 60, width: 140, backgroundColor: '#4a6dff', marginLeft: 5 }}> <FA name="rocket" /> <h3> View Discussion </h3></button>
                </Row>
              </Grid>
            )
          })
        }
      </Grid>
    );
  }
}
