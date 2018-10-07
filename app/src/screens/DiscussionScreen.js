import React from 'react';
// import EmbarkJS from 'Embark/EmbarkJS';
import { Badge, Button, Label, FormGroup, Tabs, Tab, Modal, ProgressBar, Popover, OverlayTrigger, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
import { CircleGraph } from '@aragon/ui';
import moment from 'moment';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import { RequestQRCode, RequestData, Action } from '@bloomprotocol/share-kit'
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

var FA = require('react-fontawesome');

export default class DiscussionScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bloomAuthenticated: true,
      formInputValue: '',
      rangeValue: '',
      showLoadingModal: false,
      showBloomAuthModal: false,
      thresholdReached: false,
      loadingProgress: 0,
      comments: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: moment().format("MMM Do YY"),
          user: {
            name: 'Gavin',
            avatar: 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'
          }
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: moment().format("MMM Do YY"),
          user: {
            name: 'Vitalik',
            avatar: 'https://bestshelvingunits.com/wp-content/uploads/2016/02/avatarnew.png'
          }
        },
        {
          id: 3,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: moment().format("MMM Do YY"),
          user: {
            name: 'Jutta',
            avatar: 'https://bestshelvingunits.com/wp-content/uploads/2016/02/avatarnew.png'
          }
        },
        {
          id: 4,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: moment().format("MMM Do YY"),
          user: {
            name: 'Vlad',
            avatar: 'https://bestshelvingunits.com/wp-content/uploads/2016/02/avatarnew.png'
          }
        },
        {
          id: 5,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: moment().format("MMM Do YY"),
          user: {
            name: 'Bjorn',
            avatar: 'https://bestshelvingunits.com/wp-content/uploads/2016/02/avatarnew.png'
          }
        }
      ]
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);
    this.handleBloomAuthenticate = this.handleBloomAuthenticate.bind(this);
    this.progress = this.progress.bind(this);
  }

  getValidationState() {
    const length = this.state.formInputValue.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleBloomAuthenticate() {
    // 1. show modal with Bloom Share Kit QR code
    this.setState({ showBloomAuthModal: true });
  }

  handleChange(e) {
    this.setState({ formInputValue: e.target.value });
  }

  handleClose() {
    this.setState({ showLoadingModal: false, showBloomAuthModal: false });
  }

  handleShow() {
    this.setState({ showLoadingModal: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleShow(); // 1. do some loading animation stuff
    // 2. call contract functions via web3
  }

  handleChangeRange(value) {
    console.log(value);

    this.setState({
      rangeValue: value
    });
  }

  progress() {
    if (this.state.loadingProgress >= 100) {
      this.handleClose();
    }
    this.setState((state) => {
      return {
        loadingProgress: state.loadingProgress + 14
      }
    });
  }

  renderBloomAuthModal() {
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
      <Modal show={this.state.showBloomAuthModal} onHide={this.handleClose}>
      <Modal.Header closeButton> Authenticate with Bloom </Modal.Header>
        <Modal.Body >
          <RequestQRCode requestData={defaultData} size={400} />
        </Modal.Body>
        <Modal.Footer> We just want to make sure you are who you say you are, but we don't need to know who you are, if you zknow what we mean ;)</Modal.Footer>
      </Modal>
    );
  }

  renderLoadingModal() {
    return (
      <Modal show={this.state.showLoadingModal} onHide={this.handleClose}>
        <Modal.Body>
          <img src="/images/thinking.gif" alt='loading...' style={{ maxHeight:'100%', maxWidth: '100%' }}/>
        </Modal.Body>
        <Modal.Footer> Good things come to those who wait...</Modal.Footer>
        <ProgressBar
          bsStyle="info"
          now={
            this.state.loadingProgress
          }
        />
      </Modal>
    );
  }

  render() {
    return (
      <Grid>
          <Grid className='App-discussion' style={{ background: 'white', color: 'black', padding: 20}}>
            <Row className='discussion-card' style={{ flex: 2, padding: 10, marginRight: 5 }}>
              <Col mdPush={3} md={6}>
                <div className='discussion-params' style={{ padding: 30 }}>
                    <img src="/images/ecf.png" alt="ethereum" style={{ height: 100, width: 200 }} />
                    <h3> Grant Allocation Discussion </h3>
                    <i style={{ color: '#172090'}}> #ResourceAllocationTemplate </i>
                    <h4> October 2018 </h4>
                    <p> The aim of the Ethereum Community Fund (ECF) is to provide both funding and connectivity while shaping the strategic direction of the space towards mainstream adoption through the development of infrastructure and compelling end-user applications.
This discussion will engage our 8 founding members as stakeholders in the grant allocation decision-making process.</p>

                    <a href="https://ethereum-magicians.org/t/eip-999-restore-contract-code-at-0x863df6bfa4/130"> View Full EIP Document </a>
                </div>
                <div className='discussion-tags' style={{ maxWidth: `100%`, display: 'flex', justifyContent: 'center' }}>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex' }}>
                    <FA name="user" />
                    <p> ECF </p>
                  </Badge>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex' }}>
                    <FA name="calendar" />
                    <p> 8/10/2018 13:00 </p>
                  </Badge>
                  <Badge style={{ padding: 15, marginRight: 5, display: 'flex'}}>
                    <FA name="angle-up" />
                    <p>Min. Threshold: 100</p>
                  </Badge>
                </div>
              </Col>
            </Row>
            <Row style={{ padding: 30 }}>
              <Col mdPush={3} md={3}>
                <Label bsStyle="primary" style={{ padding: 5 }}> Option 1</Label>
                <CircleGraph value={1/3} />
                <p> Fourthstate is a Minimum Viable Plasma implementation by a group of students stemming from Blockchain at Berkeley, one of the most promising educational initiatives in the ecosystem </p>
                <a href="https://github.com/fourthstate" alt="fourthstate"> https://github.com/fourthstate </a>
              </Col>
              <Col mdPush={3} md={3}>
                <Label bsStyle="primary" style={{ padding: 5 }}> Option 2 </Label>
                <CircleGraph value={2/3}  />
                <p> Web3j by Conor Svensson: a lightweight, highly modular, reactive, type-safe Java and Android library for Ethereum Network smart contracts and client integration. Asking for $96,000 </p>
                <a href="https://github.com/web3j/web3j" alt="web3"> https://github.com/web3j/web3j </a>
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row style={{ marginTop: 30 }}>
              <Col mdPush={3} md={6} className='user-submission'>
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
                      value={this.state.formInputValue}
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
                <Col>
                  <h4>Drag handle to your desired allocation ratio:</h4>
                  <div style={{ display: 'flex' }}>
                    <Badge style={{ padding: 15, marginRight: 5, display: 'flex'}}> Option 1 </Badge>
                    <Range min={0} max={100} defaultValue={[50]} tipFormatter={value => `${value}%`} onChange={value => this.handleChangeRange} />
                    <Badge style={{ padding: 15, marginRight: 5, display: 'flex'}}> Option 2 </Badge>
                  </div>
                </Col>
                  <button
                    className='bloom-authenticate'
                    style = {{
                      display: this.state.bloomAuthenticated ? 'hidden' : 'inline',
                      width: 230.1,
                      height: 59.8,
                      borderRadius: 7,
                      backgroundColor: '#4a6dff',
                      color: 'white',
                      boxShadow: `0 3 6 0 '#cfd8ed'`
                    }}
                    onClick={this.handleBloomAuthenticate}> <FA name="rocket" />Authenticate with Bloom </button>
                    <button
                      className='user-submit'
                      style={{
                        width: 230.1,
                        height: 59.8,
                        borderRadius: 7,
                        backgroundColor: this.state.bloomAuthenticated ? '#4a6dff' : '#cfd8ed',
                        color: 'white',
                        boxShadow: `0 3 6 0 '#cfd8ed'`
                      }}
                      disabled = { !this.state.bloomAuthenticated }
                      onClick={this.handleSubmit}> Submit </button>
              </Col>
            </Row>
          </Grid>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" style={{ marginTop: 30 }}>
              <Tab eventKey={1} title="For">
                <Col md={4} className='comments-against'>
                  {
                    this.state.comments.map(comment => {
                      return (
                        <Grid style={{ background: 'white', color: 'black', borderRadius: 10, marginTop: 30 }}>
                          <Row style={{ boxShadow: `0 3 6 0 #cfd8ed` }}>
                            <Col className="user">
                              <img src={comment.user.avatar} alt="user-avatar" style={{ height: 50, width: 50 }}/>
                              <div style={{ padding: 10 }}>{comment.user.name}</div>
                              <div style={{ padding: 10 }}>{comment.date.toString()}</div>
                            </Col>
                          </Row>
                          <Row>
                            <div style={{ padding: 30 }}> {comment.text} </div>
                          </Row>
                          <Row className="signaling-actions" style={{ display: 'flex', width: '100%', padding: 30, alignItems: 'flexEnd', color: 'white' }}>
                            <button style={{ flex: 1, borderRadius: 7, margin: 5, backgroundColor: '#4a6dff' }}> <FA name="thumbs-up" /> </button>
                            <button style={{ flex: 1, borderRadius: 7, margin: 5, backgroundColor: '#4a6dff' }}> <FA name="thumbs-down" /> </button>
                          </Row>
                        </Grid>
                      )
                    })
                  }
                </Col>
              </Tab>
              <Tab eventKey={2} title="Against">
                <Col md={4} className='comments-against'>
                  {
                    this.state.comments.map(comment => {
                      return (
                        <Grid style={{ background: 'white', color: 'black', borderRadius: 10, marginTop: 30 }}>
                          <Row style={{ boxShadow: `0 3 6 0 #cfd8ed` }}>
                            <Col className="user">
                              <img src={comment.user.avatar} alt="user-avatar" style={{ height: 50, width: 50 }}/>
                              <div style={{ padding: 10 }}>{comment.user.name}</div>
                              <div style={{ padding: 10 }}>{comment.date.toString()}</div>
                            </Col>
                          </Row>
                          <Row>
                            <div style={{ padding: 30 }}> {comment.text} </div>
                          </Row>
                          <Row className="signaling-actions" style={{ display: 'flex', width: '100%', padding: 30, alignItems: 'flexEnd', color: 'white' }}>
                            <button style={{ flex: 1, borderRadius: 7, margin: 5, backgroundColor: '#4a6dff' }}> <FA name="thumbs-up" /> </button>
                            <button style={{ flex: 1, borderRadius: 7, margin: 5, backgroundColor: '#4a6dff' }}> <FA name="thumbs-down" /> </button>
                          </Row>
                        </Grid>
                      )
                    })
                  }
                </Col>
              </Tab>
            </Tabs>
          {
            this.renderLoadingModal()
          }
          {
            this.renderBloomAuthModal()
          }
          {
            this.state.showLoadingModal && this.state.loadingProgress < 100
            ?
            setInterval(() => this.progress(), 1300)
            :
            null
          }
      </Grid>
    );
  }
}
