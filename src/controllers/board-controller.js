import { StatusCodes } from 'http-status-codes'

import BoardModel from '../models/board-model.js'
import SectionModel from '../models/section-model.js'
import TaskModel from '../models/task-model.js'

export const create = async (req, res, next) => {
  const { parent } = req.body
  try {
    const boardsCount = await BoardModel.find().count()
    const board = await BoardModel.create({
      parent,
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    })
    res.status(StatusCodes.CREATED).json(board)
  } catch (err) {
    next(err)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const boards = await BoardModel.find({ user: req.user._id, parent: undefined }).sort('-position')
    res.status(StatusCodes.OK).json(boards)
  } catch (err) {
    next(err)
  }
}

export const updatePosition = async (req, res, next) => {
  try {
    const { boards } = req.body
    for (const key in boards.reverse()) {
      const board = boards[key]
      await BoardModel.findByIdAndUpdate(board._id, { $set: { position: key } })
    }
    res.status(StatusCodes.OK).json('updated')
  } catch (err) {
    next(err)
  }
}

export const getFavourites = async (req, res, next) => {
  try {
    const favourites = await BoardModel.find({
      user: req.user._id,
      favourite: true,
    }).sort('-favouritePosition')
    res.status(StatusCodes.OK).json(favourites)
  } catch (err) {
    next(err)
  }
}

export const updateFavouritePosition = async (req, res, next) => {
  const { boards } = req.body
  try {
    for (const key in boards.reverse()) {
      const board = boards[key]
      await BoardModel.findByIdAndUpdate(board._id, { $set: { favouritePosition: key } })
    }
    res.status(StatusCodes.OK).json('updated')
  } catch (err) {
    next(err)
  }
}

export const getOne = async (req, res, next) => {
  const { boardId } = req.params
  try {
    const board = await BoardModel.findOne({ user: req.user._id, _id: boardId })
    if (!board) return res.status(StatusCodes.NOT_FOUND).json('Board not found')
    const sections = await SectionModel.find({ board: boardId })
    for (const section of sections) {
      const tasks = await TaskModel.find({ section: section._id }).populate('section').sort('-position')
      section._doc.tasks = tasks
    }
    board._doc.sections = sections
    res.status(StatusCodes.OK).json(board)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const { title, description, favourite } = req.body

    if (title === '') req.body.title = 'Untitled'
    if (description === '') req.body.description = 'Add description here'
    const currentBoard = await BoardModel.findById(boardId)
    if (!currentBoard) return res.status(StatusCodes.NOT_FOUND).json('Board not found')

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await BoardModel.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort('favouritePosition')
      if (favourite) {
        req.body.favouritePosition = favourites.length > 0 ? favourites.length : 0
      } else {
        for (const key in favourites) {
          const element = favourites[key]
          await BoardModel.findByIdAndUpdate(element._id, { $set: { favouritePosition: key } })
        }
      }
    }

    const board = await BoardModel.findByIdAndUpdate(boardId, { $set: req.body })
    res.status(StatusCodes.OK).json(board)
  } catch (err) {
    next(err)
  }
}

export const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const sections = await SectionModel.find({ board: boardId })
    for (const section of sections) {
      await TaskModel.deleteMany({ section: section._id })
    }
    await SectionModel.deleteMany({ board: boardId })

    const currentBoard = await BoardModel.findById(boardId)

    if (currentBoard.favourite) {
      const favourites = await BoardModel.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort('favouritePosition')

      for (const key in favourites) {
        const element = favourites[key]
        await BoardModel.findByIdAndUpdate(element._id, { $set: { favouritePosition: key } })
      }
    }

    await BoardModel.deleteOne({ _id: boardId })

    const boards = await BoardModel.find().sort('position')
    for (const key in boards) {
      const board = boards[key]
      await BoardModel.findByIdAndUpdate(board._id, { $set: { position: key } })
    }

    res.status(StatusCodes.OK).json('deleted')
  } catch (err) {
    next(err)
  }
}
