import express from 'express'

import * as boardController from '../controllers/board.controller.js'
import { verifyToken } from '../middlewares/verify-token.js'

import { validate } from '../utils/validation.js'
import { boardIdParamValidation } from '../validations/board.js'
import { uploadCover } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.post('/create', boardController.create)
router.get('/', boardController.getAll)
router.put('/update-position', boardController.updatePosition)
router.get('/favourites', boardController.getFavourites)
router.put('/favourites', boardController.updateFavouritePosition)
router.post('/invite-member', boardController.inviteMember)
router.patch(
  '/upload-cover/:boardId',
  boardIdParamValidation(),
  uploadCover.single('cover'),
  boardController.uploadCover,
)
router.delete('/delete-cover/:boardId', boardIdParamValidation(), boardController.deleteCover)
router.get('/:boardId', boardIdParamValidation(), validate, boardController.getOne)
router.put('/:boardId', boardIdParamValidation(), validate, boardController.update)
router.delete('/:boardId', boardIdParamValidation(), validate, boardController.deleteBoard)

export default router
