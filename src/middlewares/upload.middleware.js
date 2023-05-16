import fs from 'fs'
import path from 'path'

import multer from 'multer'
import createHttpError from 'http-errors'

import { nanoid, alphabetLowerCaseLetters } from '../config/nanoid.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = './uploads/covers'
    fs.mkdirSync(directory, { recursive: true })
    return cb(null, directory)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid(alphabetLowerCaseLetters, 16) + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)
  const mimetypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  if (mimetypes.includes(ext)) return cb(null, true)
  return cb(createHttpError.BadRequest('The submitted image format is not correct'))
}

const pictureMaxSize = 1 * 1000 * 1000 // 1MB

export const uploadCover = multer({
  storage,
  fileFilter,
  limits: { fileSize: pictureMaxSize },
})
