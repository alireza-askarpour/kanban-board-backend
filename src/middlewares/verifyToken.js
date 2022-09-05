import UserModel from '../models/userModel.js'
import { verifyJwtToken } from '../utils/token.js'

export const verifyToken = async (req, res, next) => {
  try {
    const authError = {
      status: 401,
      message: 'Unathorized',
    }

    const authorization = req?.headers?.authorization
    if (!authorization) throw authError

    let token = authorization.split(' ')?.[1]
    if (!token) {
      throw authError
    }

    const result = verifyJwtToken(token)
    const { username } = result
    const user = await UserModel.findOne({ username }, { password: 0, __v: 0 })

    if (!user) {
      throw authError
    }

    req.user = user

    return next()
  } catch (error) {
    next(error)
  }
}
