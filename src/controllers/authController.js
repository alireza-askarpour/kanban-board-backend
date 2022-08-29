import bcrypt from 'bcrypt'

import UserModel from '../models/userModel.js'

import { hashString } from '../utils/hashString.js'
import { tokenGenerator } from '../utils/token.js'

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, full_name } = req.body
    const hashedPassword = hashString(password)
    const token = tokenGenerator({ username })

    const user = await UserModel.create({
      full_name,
      username,
      email,
      password: hashedPassword,
      token,
    })

    return res.status(201).json({
      status: 201,
      success: true,
      user,
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username }, { password: 1 })

    if (!user) {
      throw { status: 401, message: 'The username or password is incorrect' }
    }

    const compareResult = bcrypt.compareSync(password, user.password)

    if (!compareResult) {
      throw { status: 401, message: 'The username or password is incorrect' }
    }

    const token = tokenGenerator({ username })

    user.token = token
    user.save()

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'You have successfully logged into your account',
      token,
    })
  } catch (err) {
    next(err)
  }
}
