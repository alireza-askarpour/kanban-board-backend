import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/database.js'
import { globalErrorHandler, notFoundErrorHandler } from './controllers/errorsController.js'

// config
dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 8000
const mode = process.env.NODE_ENV

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// error hanler
app.use(notFoundErrorHandler)
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running in ${mode} mode on port ${port}`)
})
