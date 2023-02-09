import express from 'express'

import * as authController from '../controllers/authController.js'
import { loginValidation, signupValidation } from '../validations/auth.js'
import { validate } from '../utils/validation.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

/**
 * @swagger
 *    tags: 
 *       name: Authentication
 *       description: User authentication section
 */

/**
 * @swagger
 *    /auth/signup:
 *       post:
 *          tags: [Authentication]
 *          summary: signup user with username, email and password
 *          parameters:
 *             -  in: formData
 *                name: username
 *                type: string
 *                required: true
 *             -  in: formData
 *                name: email
 *                type: string
 *                required: true
 *             -  in: formData
 *                name: password
 *                type: string
 *                required: true
 *          responses:
 *             201:
 *                descrption: Success
 *             401: 
 *                description: Unauthorization
 *             500: 
 *                description: Internal server error
 */

router.post('/signup', signupValidation(), validate, authController.signup)
router.post('/login', loginValidation(), validate, authController.login)
router.post('/verify-token', verifyToken, authController.verifyToken)

export default router
