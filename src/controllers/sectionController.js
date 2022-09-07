import SectionModel from '../models/sectionModel.js'
import TaskModel from '../models/taskModel.js'

export const createSection = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const section = await SectionModel.create({ board: boardId })
    section._doc.tasks = []
    res.status(201).json(section)
  } catch (err) {
    next(err)
  }
}

export const updateSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params
    const section = await SectionModel.findByIdAndUpdate(sectionId, { $set: req.body })
    section._doc.tasks = []
    res.status(200).json(section)
  } catch (err) {
    next(err)
  }
}
