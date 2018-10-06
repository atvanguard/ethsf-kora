const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) =>
  res.sendFile(
    path.resolve(__dirname, '..', 'build', 'index.html')
  )
);

app.post('/api/bloomShareReceiveData', (req, res) => {
  try {
      console.log(`Received data for request token ${req.body.token}`)
      const parsedData = req.body.data;
      parsedData.forEach(dataToVerify => {
        console.log(`Attempting to verify ${JSON.stringify(dataToVerify)}`)
      })
      return res.status(200).json({
        success: true,
        token: req.body.token,
      })
    } catch (error) {
        console.log('Encountered an error while receiving data', {
          error,
        })
      }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
