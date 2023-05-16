import mongoose from 'mongoose'

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: undefined },
    title: { type: String, default: 'Untitled' },
    position: { type: Number },
    favourite: { type: Boolean, default: false },
    favouritePosition: { type: Number, default: 0 },
    description: { type: String, default: undefined },
    cover: { type: String, default: undefined },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export default mongoose.model('board', Schema)
