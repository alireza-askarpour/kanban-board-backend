import BoardModel from '../models/BoardModel.js'

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
