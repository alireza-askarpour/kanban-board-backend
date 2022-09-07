import express from 'express'

import authRouter from './authRoutes.js'
import boardRouter from './boardRouter.js'
import sectionRouter from './sectionRouter.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/boards', boardRouter)
router.use('/boards/:boardId/sections', sectionRouter)

export default router
