import React from 'react';
import { Badge, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
var FA = require('react-fontawesome');

export default class DiscussionScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      comments: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: Date.now(),
          user: {
            name: 'Andrew',
            avatar: 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'
          }
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: Date.now(),
          user: {
            name: 'Bob',
            avatar: 'https://bestshelvingunits.com/wp-content/uploads/2016/02/avatarnew.png'
          }
        }
      ]
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Grid>
          <Grid className='App-discussion' style={{ background: 'white', color: 'black', padding: 20}}>
            <Row className='discussion-card' style={{ flex: 2, padding: 10, marginRight: 5 }}>
              <Col>
                <div className='discussion-params' style={{ padding: 20, marginBottom: 20 }}>
                    <h3> Should we fork Ethereuem? </h3>
                    <h4> Oct 5, 2018 </h4>
                    <p> This document proposes to restore the contract code of the `WalletLibrary` contract at `0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4` with a patched version. The contract was accidentally self-destructed and renders a significant amount of Ether inaccessible. </p>
                </div>
                <div className='discussion-tags' style={{ maxWidth: `100%`, display: 'flex', justifyContent: 'center' }}>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex' }}>
                    <FA name="rocket" />
                    <p> Eth Foundation </p>
                  </Badge>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex' }}>
                    <FA name="rocket" />
                    <p> 8/10/2018 13:00 </p>
                  </Badge>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex'}}>
                    <FA name="rocket" />
                    <p>100 tokens spent </p>
                  </Badge>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex'}}>
                    <FA name="rocket" />
                    <p>Voting app </p>
                  </Badge>
                </div>
              </Col>
              <Col className='user-submission' style={{ flex: 1, padding: 20 }}>
                <form className='user-input'>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel
                      style={{
                        fontFamily: 'SFProText',
                        fontSize: 24,
                        fontWeight: 500,
                        fontStyle: 'normal',
                        fontStretch: 'normal',
                        lineHeight: 1.37,
                        letterSpacing: -0.9,
                        textAlign: 'left',
                        color: '#291a41'
                      }}> Enter your comments about the proposal. </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="Enter your comments about the proposal."
                      onChange={this.handleChange}
                      style={{
                        width: `100%`,
                        height: 131.9,
                        opacity: 0.3,
                        borderRadius: 10,
                        border: `solid 2px #cfd8ed`
                      }}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                  </FormGroup>
                </form>
                <button className='user-submit' style={{
                  width: 230.1,
                  height: 59.8,
                  borderRadius: 7,
                  backgroundColor: '#4a6dff',
                  color: 'white',
                  boxShadow: `0 3 6 0 '#cfd8ed'`
                }}> Submit </button>
              </Col>
            </Row>
          </Grid>
          <Grid style={{ marginTop: 30, color: 'black' }}>
            <Row style={{  }}>
              <Col className='comments'>
                {
                  this.state.comments.map(comment => {
                    return (
                      <Grid style={{ background: 'white', borderRadius: 10, marginTop: 30 }}>
                        <Row style={{ boxShadow: `0 3 6 0 #cfd8ed` }}>
                          <Col className="user">
                            <img src={comment.user.avatar} alt="user-avatar" style={{ height: 50, width: 50 }}/>
                            <div style={{ padding: 10 }}>{comment.user.name}</div>
                            <div style={{ padding: 10 }}>{comment.date.toString()}</div>
                          </Col>
                        </Row>
                        <Row>
                          <div> {comment.text} </div>
                        </Row>
                      </Grid>
                    )
                  })
                }
              </Col>
            </Row>
          </Grid>
      </Grid>
    );
  }
}
