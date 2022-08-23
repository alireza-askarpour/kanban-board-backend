import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/database.js'

// config
dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 8000
const mode = process.env.NODE_ENV

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Server running in ${mode} mode on port ${port}`)
})
