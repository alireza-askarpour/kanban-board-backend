import express from 'express'

import * as taskController from '../controllers/task.controller.js'
import { verifyToken } from '../middlewares/verify-token.js'

import { validate } from '../utils/validation.js'
import { createValidation, upadtePositionValidation, deleteValidation, updateValidation } from '../validations/task.js'

const router = express.Router({ mergeParams: true })

router.post('/create', createValidation(), validate, verifyToken, taskController.createTask)
router.put('/update-position', upadtePositionValidation(), verifyToken, taskController.updatePositionTask)
router.delete('/:taskId', deleteValidation(), validate, verifyToken, taskController.deleteTask)
router.put('/:taskId', updateValidation(), validate, verifyToken, taskController.updateTask)

export default router
