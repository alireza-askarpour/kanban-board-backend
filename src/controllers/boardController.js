import BoardModel from '../models/BoardModel.js'
import SectionModel from '../models/sectionModel.js'

export const create = async (req, res, next) => {
  try {
    const boardsCount = await BoardModel.find().count()
    const board = await BoardModel.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    })
    res.status(201).json(board)
  } catch (err) {
    next(err)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const boards = await BoardModel.find({ user: req.user._id }).sort('-position')
    res.status(200).json(boards)
  } catch (err) {
    next(err)
  }
}

export const updatePosition = async (req, res) => {
  try {
    const { boards } = req.body
    for (const key in boards.reverse()) {
      const board = boards[key]
      await BoardModel.findByIdAndUpdate(board.id, { $set: { position: key } })
    }
    res.status(200).json('updated')
  } catch (err) {
    next(err)
  }
}

export const getFavourites = async (req, res) => {
  try {
    const favourites = await BoardModel.find({
      user: req.user._id,
      favourite: true,
    }).sort('-favouritePosition')
    res.status(200).json(favourites)
  } catch (err) {
    next(err)
  }
}

export const updateFavouritePosition = async (req, res) => {
  const { boards } = req.body
  try {
    for (const key in boards.reverse()) {
      const board = boards[key]
      await BoardModel.findByIdAndUpdate(board.id, { $set: { favouritePosition: key } })
    }
    res.status(200).json('updated')
  } catch (err) {
    next(err)
  }
}

export const getOne = async (req, res) => {
  const { boardId } = req.params
  try {
    const board = await BoardModel.findOne({ user: req.user._id, _id: boardId })
    if (!board) return res.status(404).json('Board not found')
    const sections = await SectionModel.find({ board: boardId })
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id }).populate('section').sort('-position')
      section._doc.tasks = tasks
    }
    board._doc.sections = sections
    res.status(200).json(board)
  } catch (err) {
    next(err)
  }
}
