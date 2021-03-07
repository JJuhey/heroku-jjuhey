const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config')

const app = express()
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.urlencoded({ extends: true }))
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const UserSchema = require('./Model/UserSchema');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err))

// Test Request
app.get('/api/hello', (req, res) => {
  res.json({ hello: 'Hello World!' });
})

// User Request
app.post('/api/users/login', (req, res) => {
  UserSchema.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({ success: false, massage: 'no user' })
    }

    res.json({ success: true, user: user })
  })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node Playground App Listening at attp://localhost:${port}`);
})