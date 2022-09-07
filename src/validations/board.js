import { param } from 'express-validator'
import { isObjectId } from '../utils/validation.js'

export const boardIdParamValidation = () => {
  return [
    param('boardId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid id'
      return true
    }),
  ]
}
