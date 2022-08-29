import express from 'express'

import * as authController from '../controllers/authController.js'
import { validate } from '../utils/validation.js'
import { signupValidation } from '../validations/auth.js'

const router = express.Router()

router.post('/signup', signupValidation(), validate, authController.signup)

export default router
