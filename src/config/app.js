import chalk from 'chalk'
import createError from 'http-errors'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const port = process.env.PORT || 8000
export const mode = process.env.NODE_ENV || 'development'

export const appListener = () => {
  const runningMode = `Server running in ${chalk.bold(mode)} mode`
  const runningOnPort = `on port ${chalk.bold(port)}`
  const runningSince = `[since ${new Date().toISOString()}]`
  console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`)
}

export const appErrorHandler = (err, req, res, next) => {
  const serverError = createError.InternalServerError()
  const status = err.status || serverError.status
  const message = err.message || serverError.message

  res.status(status).json({ ok: false, status, message, stack: err.stack })
}
