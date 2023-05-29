import Joi from 'joi'
import createHttpError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const boardIdSchema = Joi.object({
  boardId: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createHttpError.BadRequest('INVALID_BOARD_ID')),
})
