import express from 'express'

import * as authController from '../controllers/authController.js'
import { validate } from '../utils/validation.js'
import { loginValidation, signupValidation } from '../validations/auth.js'

const router = express.Router()

router.post('/signup', signupValidation(), validate, authController.signup)
router.post('/login', loginValidation(), validate, authController.login)

export default router
