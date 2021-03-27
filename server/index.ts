import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const config = require('./config')
import controller from './users/controller';

const app = express()

// front-end routing
console.log(config)
if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
  })
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err))

// Test Request
app.get('/api/hello', (req: express.Request, res: express.Response) => {
  res.json({ hello: 'Hello World!' });
})

app.use('/api/users', controller);

// Error Handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction)=> {
  console.error(err)
  if (err.message) {
    // custom application error
    return res.json({ success: false, message: err.message });
  } else if (typeof err === 'string') {
    return res.json({ success: false, message: err })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
})

const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`JJuhey-heroku App Listening at http://${ip}:${port}`);
})