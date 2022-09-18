import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const UserSchema = new Schema(
  {
    fullname: { type: String },
    username: { type: String, required: true, unique: true, min: 3 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, min: 8, select: false },
    avatar: { type: String, default: '' },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    roles: { type: [String], default: ['USER'] },
  },
  { timestamps: true },
)

export default model('User', UserSchema)
