import Joi from 'joi'
import { param } from 'express-validator'
import createHttpError from 'http-errors'

import { isObjectId } from '../utils/validation.js'
import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const boardIdParamValidation = () => {
  return [
    param('boardId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid id'
      return true
    }),
  ]
}

export const inviteMemberSchema = Joi.object({
  boardId: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createHttpError.BadRequest('INVALID_BOARD_ID')),
  email: Joi.string().email().required().error(createHttpError.BadRequest('INVALID_EMAIL')),
  access: Joi.string().pattern(/(view|edit)/i).error(createHttpError.BadRequest('INVALID_ACCESS')),
})
