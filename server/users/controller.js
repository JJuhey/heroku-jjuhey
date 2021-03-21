const express = require('express')
const router = express.Router()
const userService = require('./service')

// routes
router.post('/login', loginUser)
router.get('/logout', logoutUser)

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
  userService.logout(req.body)
    .then(user => {
      return res.status(200).json({ success: true })
    })
    .catch(next)
}