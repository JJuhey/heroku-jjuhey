const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
  res.json({ hello: 'Hello World!' });
})

app.get('*', (req, res) => {
  res.send('Hello, world!');
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node Playground App Listening at attp://localhost:${port}`);
})