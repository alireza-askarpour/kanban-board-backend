import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const BoardSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  icon: { type: String, default: '📃' },
  title: { type: String, default: 'Untitled' },
  position: { type: Number },
  favourite: { type: Boolean, default: false },
  favouritePosition: { type: Number, default: 0 },
  description: {
    type: String,
    default: `Add description here
        🟢 You can add multiline description
        🟢 Let's start...`,
  },
})

export default model('Board', BoardSchema)
