const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config')
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  token: String,
  role: Number,
})

// user를 save할 때, 무조건 password를 암호화 처리하도록 해줌
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next();
      })
    })
  } else next();
})

// user의 password를 암호화된 비번으로 비교해줌
userSchema.methods.comparePassword = function (plainPwd, cb) {
  return bcrypt.compare(plainPwd, this.password)
}

userSchema.statics.findByToken = async function (token, cb) {
  const decode = jwt.verify(token, config.secretToken)

  const user = await this.findOne({ _id: decode, token })

  cb(null, user)
}

module.exports = mongoose.model('User', userSchema)