import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.model.js'

import { hashString } from '../utils/hash-string.js'
import { tokenGenerator } from '../utils/token.js'

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = hashString(password)
    const token = tokenGenerator({ username })

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      token,
    })

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
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

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Login was successful!',
      token,
    })
  } catch (err) {
    next(err)
  }
}

export const verifyToken = (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}
