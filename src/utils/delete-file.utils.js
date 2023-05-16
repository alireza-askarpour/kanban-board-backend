import fs from 'fs'
import path from 'path'
import { __dirname } from '../../__dirname.js'

export const deleteFile = (fileAddress) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, fileAddress)
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
  }
}
