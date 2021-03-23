const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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

// userSchema.methods.findByToken = function (token, cb) {
//   const user = this;

//   jwt.verify(token, 'secretToken', function(err, decode) {
//     user.findOne({ "id": decode, "token": token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user)
//     })
//   })
// }


module.exports = mongoose.model('User', userSchema)