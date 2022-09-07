import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const SectionSchema = new Schema({
  board: { type: Types.ObjectId, ref: 'Board', required: true },
  title: { type: String, default: '' },
}, {
  timestamp: true
})

export default model('Section', SectionSchema)