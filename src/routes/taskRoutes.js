import express from 'express'
import { createValidation, upadtePositionValidation, deleteValidation, updateValidation } from '../validations/task.js'
import { validate } from '../utils/validation.js'
import { verifyJwtToken } from '../utils/token.js'
import * as taskController from '../controllers/taskController.js'

const router = express.Router()

router.post('/create', createValidation(), validate, verifyJwtToken, taskController.createTask)

export default router
