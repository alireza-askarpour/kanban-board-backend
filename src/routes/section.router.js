import express from 'express'

import * as sectionController from '../controllers/section.controller.js'
import { verifyToken } from '../middlewares/verify-token.js'

import { createValidation, updateValidation, deleteValidation } from '../validations/section.js'
import { validate } from '../utils/validation.js'

const router = express.Router({ mergeParams: true })

router.post('/create', createValidation(), validate, verifyToken, sectionController.createSection)
router.put('/update/:sectionId', updateValidation(), validate, verifyToken, sectionController.updateSection)
router.delete('/delete/:sectionId', deleteValidation(), validate, verifyToken, sectionController.deleteSection)

export default router
