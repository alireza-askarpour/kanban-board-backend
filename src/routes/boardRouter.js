import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import * as boardController from '../controllers/boardController.js'
import { boardIdParamValidation } from '../validations/board.js'
import { validate } from '../utils/validation.js'

const router = express.Router()

router.post('/create', verifyToken, boardController.create)
router.get('/', verifyToken, boardController.getAll)
router.put('/update', verifyToken, boardController.updatePosition)
router.get('/favourites', verifyToken, boardController.getFavourites)


export default router
