import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const UserSchema = new Schema(
  {
    fullname: { type: String },
    username: { type: String, required: true, unique: true, min: 3 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, min: 8, select: false },
    avatar: { type: String, default: '' },
    teams: { type: [Types.ObjectId], default: [] },
  },
  { timestamps: true, versionKey: false },
)

export default model('User', UserSchema)
