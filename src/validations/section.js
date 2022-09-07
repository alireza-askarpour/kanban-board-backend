import { param } from 'express-validator'
import { isObjectId } from '../utils/validation.js'

export const createValidation = () => {
  return [
    param('boardId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid id'
      return true
    }),
  ]
}

export const updateValidation = () => {
  return [
    param('boardId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid board id'
      return true
    }),
    param('sectionId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid section id'
      return true
    }),
  ]
}

export const deleteValidation = () => {
  return [
    param('boardId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid board id'
      return true
    }),
    param('sectionId').custom((value) => {
      if (!isObjectId(value)) throw 'invalid section id'
      return true
    }),
  ]
}
