import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

export const globalErrorHandler = (err, req, res, next) => {
  const serverError = createError.InternalServerError('INTERNAL_SERVER_ERROR')
  const status = err?.status || serverError.status
  const message = err?.message || serverError.message

  return res.status(status).json({
    status,
    success: false,
    message,
  })
}

export const notFoundErrorHandler = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    status: StatusCodes.NOT_FOUND,
    success: false,
    message: `Can't find ${req.originalUrl} on the server!`,
  })
}
