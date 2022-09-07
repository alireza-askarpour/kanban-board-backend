import TaskModel from '../models/taskModel.js'
import SectionModel from '../models/sectionModel.js'

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
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

export const updateTask = async (req, res, next) => {
  const { taskId } = req.params
  try {
    const task = await TaskModel.findByIdAndUpdate(taskId, { $set: req.body })
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
}

export const updatePositionTask = async (req, res) => {
  const { resourceList, destinationList, resourceSectionId, destinationSectionId } = req.body
  const resourceListReverse = resourceList.reverse()
  const destinationListReverse = destinationList.reverse()
  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(resourceListReverse[key].id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        })
      }
    }
    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      })
    }
    res.status(200).json('updated')
  } catch (err) {
    next(err)
  }
}
