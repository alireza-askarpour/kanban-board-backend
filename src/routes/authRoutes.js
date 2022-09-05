import express from 'express'

import * as authController from '../controllers/authController.js'
import { loginValidation, signupValidation } from '../validations/auth.js'
import { validate } from '../utils/validation.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/signup', signupValidation(), validate, authController.signup)
router.post('/login', loginValidation(), validate, authController.login)
router.post('/verify-token', verifyToken, authController.verifyToken)

export default router
