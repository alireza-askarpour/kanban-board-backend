import { StatusCodes } from 'http-status-codes'

import SectionModel from '../models/section-model.js'
import TaskModel from '../models/task-model.js'

export const createSection = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const section = await SectionModel.create({ board: boardId })
    section._doc.tasks = []
    res.status(StatusCodes.CREATED).json(section)
  } catch (err) {
    next(err)
  }
}

export const updateSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params
    const section = await SectionModel.findByIdAndUpdate(sectionId, { $set: req.body })
    section._doc.tasks = []
    res.status(StatusCodes.OK).json(section)
  } catch (err) {
    next(err)
  }
}

export const deleteSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params
    await TaskModel.deleteMany({ section: sectionId })
    await SectionModel.deleteOne({ _id: sectionId })
    res.status(StatusCodes.OK).json('deleted')
  } catch (err) {
    next(err)
  }
}
