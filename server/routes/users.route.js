import express from 'express'
import UserCtrl from './users.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// router.route("/").post(UserCtrl.apiPostUser)
// router.route("/login").post(UserCtrl.apiAuthUser)
router.route("/",auth)

export default router