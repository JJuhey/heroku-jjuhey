const express = require('express')
const router = express.Router()
const userService = require('./service')
const { auth } = require('../middleware/auth')

// routes
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/auth', auth, authUser)

module.exports = router;

function loginUser (req, res, next) {
  userService.login(req.body)
    .then(user => {
      // cookie에 저장
      return res.cookie('x_auth', user.token)
        .status(200)
        .json({ success: true, userId: user._id })
    })
    .catch(next)
}

function logoutUser (req, res, next) {
  console.log('logoutUser()')
  userService.logout(req.body)
    .then(user => {
      return res.status(200).json({ success: true })
    })
    .catch(next)
}

function authUser (req, res, next) {
  const { user } = req
  return res.status(200).json({
    _id: user._id,
    isAdmin: !(req.user.role === 0),
    isAuth: true,
    email: user.email,
    name: user.name,
  })
}