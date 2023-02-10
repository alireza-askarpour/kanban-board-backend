import bcrypt from 'bcrypt'
import createError from 'http-errors'

import UserModel from '../models/userModel.js'

import { hashString } from '../utils/hashString.js'
import { tokenGenerator } from '../utils/token.js'

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = hashString(password)
    const token = tokenGenerator({ username })

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      token,
    })

    return res.status(201).json({
      status: 201,
      success: true,
      token,
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username }, { password: 1 })
    if (!user) throw createError.Unauthorized('The username or password is incorrect')

    const compareResult = bcrypt.compareSync(password, user.password)
    if (!compareResult) throw createError.Unauthorized('The username or password is incorrect')

    const token = tokenGenerator({ username })

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Login was successful!',
      token,
    })
  } catch (err) {
    next(err)
  }
}

export const verifyToken = (req, res) => {
  res.status(200).json({ user: req.user })
}
