export const globalErrorHandler = (err, req, res, next) => {
  const status = err?.status || 500
  const message = err?.message || 'INTERNAL_SERVER_ERROR'

  return res.status(status).json({
    status,
    success: false,
    message,
  })
}

export const notFoundErrorHandler = (req, res) => {
  return res.status(404).json({
    status: 404,
    success: false,
    message: `Can't find ${req.originalUrl} on the server!`,
  })
}
