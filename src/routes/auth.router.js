import express from 'express'

import * as authController from '../controllers/auth.controller.js'
import { validate } from '../utils/validation.js'
import { loginValidation, signupValidation } from '../validations/auth.js'
import { verifyToken } from '../middlewares/verify-token.js'

const router = express.Router()

router.post('/signup', signupValidation(), validate, authController.signup)
router.post('/login', loginValidation(), validate, authController.login)
router.post('/verify-token', verifyToken, authController.verifyToken)

export default router
