import React from 'react'
import DateTimePicker from 'react-datetime-picker';
import { Alert, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import web3Util from '../utils/Web3Util';

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
        description: this.state.description
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
        <h5 class="card-title">Create new proposal</h5>
        {
          this.state.backendError !== '' &&
          <Alert bsStyle="danger">{this.state.backendError}</Alert>
        }
        <form onSubmit={this.handleSubmit}>

          <div class="form-group">
            <label for="hackathonName">Question</label>
            <input type="text" class="form-control" id="hackathonName"
              placeholder="Enter Proposal question"
              value={this.state.hackathonName}
              onChange={(e) => this.handleChange(e, 'hackathonName')} />
          </div>

          <div class="form-group">
            <label for="description">description</label>
            <input type="text" class="form-control" id="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e, 'description')} />
          </div>

          <div class="form-group">
            <label for="prizes">Min tokens spent</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="tokensHelp">To reach quoram measured by tokens spent</span>
              </div>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="tokensHelp"
                placeholder="75" id="tokens"
                value={this.state.tokens}
                onChange={(e) => this.handleChange(e, 'tokens')} />
            </div>
          </div>

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