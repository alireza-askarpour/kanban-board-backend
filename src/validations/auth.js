import { body } from 'express-validator'

import UserModel from '../models/userModel.js'

export const signupValidation = () => {
  return [
    body('full_name').trim().notEmpty().withMessage('full name is empty'),

    body('username').isLength({ min: 3 }).withMessage('username must be at least 3 characters'),

    body('username').custom(async (username) => {
      if (username) {
        const user = await UserModel.findOne({ username })
        if (user) throw 'Username is already in use'
        return true
      }
      throw 'Username cannot be empty'
    }),

    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('email').trim().notEmpty().withMessage('Email cannot be empty'),
    body('email').custom(async (email) => {
      const user = await UserModel.findOne({ email })
      if (user) {
        throw 'Email is already in use'
      }
      return true
    }),
  ]
}
