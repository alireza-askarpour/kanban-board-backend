import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import * as sectionController from '../controllers/sectionController.js'
import { validate } from '../utils/validation.js'
import { createValidation, updateValidation, deleteValidation } from '../validations/section.js'

const router = express.Router({ mergeParams: true })

router.post('/create', createValidation(), validate, verifyToken, sectionController.createSection)
router.put('/update/:sectionId', updateValidation(), validate, verifyToken, sectionController.updateSection)
router.delete('/delete/:sectionId', deleteValidation(), validate, verifyToken, sectionController.deleteSection)

export default router
