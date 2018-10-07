const express = require('express');
const path = require('path');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
var Governance = new web3.eth.Contract([
  {
    "constant": false,
    "inputs": [
      {
        "name": "dataHash",
        "type": "string"
      },
      {
        "name": "minTokensSpent",
        "type": "uint256"
      }
    ],
    "name": "newProposal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "counter",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "newDataHash",
        "type": "string"
      }
    ],
    "name": "voiceOpinion",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "readProposal",
    "outputs": [
      {
        "name": "dataHash",
        "type": "string"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "minTokensSpent",
        "type": "uint256"
      },
      {
        "name": "addressBalance",
        "type": "uint256"
      },
      {
        "name": "email",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "email",
        "type": "string"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "assignTokens",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
], '0x5c702Fbbcfb8EF5cc70c4E4341AA437ef9D55281', {
  from: '0xb4124ceb3451635dacedd11767f004d8a28c6ee7', // default from address
  gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

// app.use(express.static(path.resolve(__dirname, '..', 'build')));

// app.use(cors());

// parse application/json
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// app.get('*', (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, '..', 'build', 'index.html')
//   )
// });

// app.get('/showBloomQr', (req, res, next) => {
//   // /showBloomQr?payload='{}'
//   const payload = JSON.parse(req.params.payload);
//   console.log(payload)
// })

app.post('/receiveBloomData/:id', cors(), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(`Received data for request token`)
  // console.log(JSON.stringify(req.body, null, 4))
  console.dir(req.body, {depth: null})
  // find eth address from bloom id and save email
  var assignTo = '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb';
  console.log(parseInt(req.params.id));
  Governance.methods.assignTokens(parseInt(req.params.id), assignTo, 'arpitagarwal@iitj.ac.in', 50).send()
  .then(() => console.log('tokens assigned'))
  .catch(err => console.log(err))

  //, 2, {depth: null})
  // try {
  // return res.status(200).json({
  //   success: true,
  //   token: req.token,
  // })
    //   const parsedData = req.data;
    //   parsedData.forEach(dataToVerify => {
    //     console.log(`Attempting to verify ${JSON.stringify(dataToVerify)}`)
    //   })
    //   return res.status(200).json({
    //     success: true,
    //     token: req.token,
    //   })
    // } catch (error) {
    //     console.log('Encountered an error while receiving data', {
    //       error,
    //     })
      }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
