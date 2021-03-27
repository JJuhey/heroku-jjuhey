import jwt from 'jsonwebtoken';

import User from '../models/UserSchema';
const config = require('../config')

const userService = {
  login,
  logout,
}

async function login({ email, password }: { email: string, password: string }) {
  const user = await User.findOne({ email }).exec()
  if (!user) throw Error('No user with email')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw Error('password is not correct')

  const token = jwt.sign(user._id.toHexString(), config.secretToken);
  user.token = token

  const userWithToken = await user.save()

  return userWithToken
}

async function logout({ _id }) {
  const user = await User.findByIdAndUpdate(_id, { token: '' })
  return user
}

export default userService