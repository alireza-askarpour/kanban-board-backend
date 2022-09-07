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
