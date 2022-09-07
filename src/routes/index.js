import express from 'express'

import authRouter from './authRoutes.js'
import boardRouter from './boardRouter.js'
import sectionRouter from './sectionRouter.js'
import taskRouter from './taskRoutes.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/boards', boardRouter)

export default router
