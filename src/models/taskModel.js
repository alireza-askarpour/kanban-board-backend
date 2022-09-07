import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const TaskModel = new Schema(
  {
    section: { type: Types.ObjectId, ref: 'Section', require: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    position: { type: Number },
  },
  {
    timestamps: true,
  },
)

export default model('Task', TaskModel)
