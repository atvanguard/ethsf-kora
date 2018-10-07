import React from 'react'
import DateTimePicker from 'react-datetime-picker';
import { Alert, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import web3Util from '../utils/Web3Util';

const labelStyle = {
  fontFamily: 'SFProText',
  fontSize: 24,
  fontWeight: 500,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.37,
  letterSpacing: -0.9,
  textAlign: 'left',
  color: '#291a41'
}

export default class CreateProposal extends React.Component {
  constructor() {
    super();
    this.state = {
      hackathonName: '',
      description: '',
      // startsAt: '',
      tokens: 0,
      // endsAt: '',
      fileToUpload: null,
      backendError: '',
      startsAt: new Date(),
      endsAt: new Date(),
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }

  handleCalChange(key, date) {
    console.log(key, date)
    this.setState({[key]: date})
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    try {
      // const startsAt = Date.parse(this.state.startsAt) / 1000;
      const endsAt = Date.parse(this.state.endsAt) / 1000;
      const details = {
        title: this.state.hackathonName,
        description: this.state.description,
        email: 'yj@parity.io'
      }
      await web3Util.newProposal(details, this.state.tokens /* minTokens */);
    } catch (err) {
      this.setState({backendError: err.message || err});
    }
  }

  handleFileUpload(e) {
    this.setState({ fileToUpload: [e.target] });
  }

  // async uploadFile(e) {
  //   e.preventDefault();
  //   try {
  //     const hash = await EmbarkJS.Storage.uploadFile(this.state.fileToUpload);
  //     this.setState({fileHash: hash, backendError: ''});
  //   } catch(err) {
  //     this.setState({backendError: err.message || err});
  //   }
  // }

  render() {
    return (
      <div class="card">
      <div class="card-body">
        <h1 class="card-title app-header">Create new discussion</h1>
        {
          this.state.backendError !== '' &&
          <Alert bsStyle="danger">{this.state.backendError}</Alert>
        }
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel
              style={labelStyle}> Question </ControlLabel>
            <FormControl
              type="text"
              value={this.state.hackathonName}
              placeholder="Enter Proposal question"
              onChange={(e) => this.handleChange(e, 'hackathonName')}
              style={{
                width: `100%`,
                height: 131.9,
                borderRadius: 10,
                border: `solid 2px #cfd8ed`
              }}
              id="hackathonName"
            />
            <ControlLabel
              style={labelStyle}> Description </ControlLabel>
            <FormControl
              type="text"
              value={this.state.description}
              placeholder="Enter a description of your motivations and intentions for raising this question"
              onChange={(e) => this.handleChange(e, 'description')}
              style={{
                width: `100%`,
                height: 131.9,
                borderRadius: 10,
                border: `solid 2px #cfd8ed`
              }}
              id="hackathonDescription"
            />
            <ControlLabel
              style={labelStyle}> Min Token Threshold to Reach Quorum </ControlLabel>
            <FormControl
              type="text"
              value={this.state.tokens}
              placeholder="55"
              onChange={(e) => this.handleChange(e, 'tokens')}
              style={{
                width: `100%`,
                height: 131.9,
                borderRadius: 10,
                border: `solid 2px #cfd8ed`
              }}
              id="hackathonDescription"
            />
            <div class="form-row">
              <div class="form-group col">
                <label for="endsAt">Ends at</label>
                <div style={{"height": "35px"}}>
                  <DateTimePicker
                    onChange={(date) => this.handleCalChange('endsAt', date)}
                    value={this.state.endsAt} />
                </div>
              </div>
            </div>

          </FormGroup>





          {/* <div class="form-group">
            <label>Upload other Hackathon details</label>
            <Form inline>
              <FormGroup>
                <FormControl
                  type="file"
                  onChange={(e) => this.handleFileUpload(e)} />
                <Button bsStyle="primary" onClick={(e) => this.uploadFile(e)}>Upload to IPFS</Button>
              </FormGroup>
            </Form>
            <input type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="uploadHelp"
              disabled
              value={this.state.fileHash}
              onChange={(e) => this.handleChange(e, 'fileHash')} />
            <small id="uploadHelp" class="form-text text-muted">The IPFS hash of the hackathon details doc</small>
          </div> */}

          <button type="submit" class="btn btn-success">Create Proposal</button>
        </form>
      </div>
      </div>
    )
  }
}
