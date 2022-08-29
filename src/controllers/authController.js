import { hashString } from '../utils/hashString.js'
import UserSchema from '../models/userModel.js'

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, full_name } = req.body
    const hashedPassword = hashString(password)

    const user = await UserSchema.create({
      full_name,
      username,
      email,
      password: hashedPassword,
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
