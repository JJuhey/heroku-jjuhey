const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// 환경변수 가져오기
// 1. 데이터베이스 URI
// const config = require('./config')

// mongoDB 연결
// const mongoose = require('mongoose')
// mongoose.connect(config.mongoURI, {
//   useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// }).then(() => {
//   console.log('MongoDB Connected...')
// }).catch((err) => {
//   console.log(err)
// })

app.use(express.static('build'));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({ hello: 'Hello World!' })
})

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})