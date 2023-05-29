import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const SectionSchema = new Schema(
  {
    board: { type: Types.ObjectId, ref: 'Board', required: true },
    title: { type: String, default: '' },
  },
  {
    timestamp: true,
    versionKey: false,
  },
)

export default model('Section', SectionSchema)
