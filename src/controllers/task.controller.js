import { StatusCodes } from 'http-status-codes'

import TaskModel from '../models/task.model.js'
import SectionModel from '../models/section.model.js'

export const createTask = async (req, res, next) => {
  try {
    const { sectionId } = req.body
    const section = await SectionModel.findById(sectionId)
    const tasksCount = await TaskModel.find({ section: sectionId }).count()
    const task = await TaskModel.create({
      section: sectionId,
      position: tasksCount > 0 ? tasksCount : 0,
    })
    task._doc.section = section
    res.status(StatusCodes.CREATED).json(task)
  } catch (err) {
    next(err)
  }
}

export const updateTask = async (req, res, next) => {
  const { taskId } = req.params
  try {
    const task = await TaskModel.findByIdAndUpdate(taskId, { $set: req.body })
    res.status(StatusCodes.OK).json(task)
  } catch (err) {
    next(err)
  }
}

export const updatePositionTask = async (req, res, next) => {
  const { resourceList, destinationList, resourceSectionId, destinationSectionId } = req.body
  const resourceListReverse = resourceList.reverse()
  const destinationListReverse = destinationList.reverse()

  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await TaskModel.findByIdAndUpdate(resourceListReverse[key]._id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        })
      }
    }
    for (const key in destinationListReverse) {
      await TaskModel.findByIdAndUpdate(destinationListReverse[key]._id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      })
    }
    res.status(StatusCodes.OK).json('updated')
  } catch (err) {
    next(err)
  }
}

export const deleteTask = async (req, res, next) => {
  const { taskId } = req.params
  try {
    const currentTask = await TaskModel.findById(taskId)
    await TaskModel.deleteOne({ _id: taskId })
    const tasks = await TaskModel.find({ section: currentTask.section }).sort('postition')
    for (const key in tasks) {
      await TaskModel.findByIdAndUpdate(tasks[key]._id, { $set: { position: key } })
    }
    res.status(StatusCodes.OK).json('deleted')
  } catch (err) {
    next(err)
  }
}
