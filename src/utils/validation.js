import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  let messages = {}

  const result = validationResult(req)
  if (result?.errors?.length > 0) {
    messages = {}
    result?.errors?.forEach((err) => {
      messages[err.param] = err.msg
    })
    return res.status(400).json({
      status: 400,
      success: false,
      messages,
    })
  }
  next()
}

export const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value)
