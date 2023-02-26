import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUI from "swagger-ui-express"

import { isDevelopment, appListener, appErrorHandler } from './config/app.js'
import { swaggerSetup } from './config/swagger.js'
import connectDB from './config/database.js'
import allRoutes from './routes/index.js'

import { notFoundErrorHandler } from './controllers/errors-controller.js'
import { morganMiddleware } from './middlewares/morgan.js'

// config
dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 8000
const mode = process.env.NODE_ENV

// middlewares
if (isDevelopment) app.use(morganMiddleware)
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// settings
app.use("/api-doc", swaggerUI.serve, swaggerSetup)

// routes
app.use(allRoutes)

// error hanler
app.use(notFoundErrorHandler)
app.use(appErrorHandler)

app.listen(port, appListener)
