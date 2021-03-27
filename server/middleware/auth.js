const UserSchema = require('../models/UserSchema');

const auth = (req, res, next) => {
  console.log('auth function')
  let token = req.cookies.x_auth;
  console.log(`token: ${token}`)

  UserSchema.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user) throw Error('no User with token')

    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = { auth };