const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config')

const app = express()

// front-end routing
if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"))
})

app.use(bodyParser.urlencoded({ extends: true }))
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err))

// Test Request
app.get('/api/hello', (req, res) => {
  res.json({ hello: 'Hello World!' });
})

app.use('/api/users', require('./users/controller'));

// Error Handling
app.use((err, req, res, next)=> {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
})

const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`JJuhey-heroku App Listening at http://${ip}:${port}`);
})