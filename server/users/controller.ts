import express from 'express'
import userService from './service'
import { auth } from '../middleware/auth'
import { IUser } from '../models/UserSchema'

const router = express.Router()
// routes
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/auth', auth, authUser)

function loginUser (req: express.Request, res: express.Response, next: express.NextFunction) {
  userService.login(req.body)
    .then(user => {
      return res.cookie('x_auth', user.token)
        .status(200)
        .json({
          success: true,
          _id: user._id,
          isAdmin: !(user.role === 0),
          isAuth: true,
          email: user.email,
          name: user.name,
        })
    })
    .catch(next)
}

function logoutUser (req: express.Request, res: express.Response, next: express.NextFunction) {
  userService.logout(req.body)
    .then(user => {
      return res.status(200).json({ success: true })
    })
    .catch(next)
}

function authUser (req: express.Request, res: express.Response, next: express.NextFunction) {
  const { user } = req
  // console.log(user)
  if (!user) return res.json({ success: false, message: 'Fail to authentication' })

  return res.status(200).json({ success: true })
}

export default router
