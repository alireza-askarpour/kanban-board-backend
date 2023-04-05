import path from 'path'
import express from 'express'

import { __dirname } from '../../__dirname.js'

const router = express.Router()

const dir = path.join(__dirname, 'src', 'pages', 'home.html')

router.get('/', (req, res) => res.sendFile(dir))

export default router
