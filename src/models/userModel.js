import mongoose from 'mongoose'

const { Schema, model, Types } = mongoose

const UserSchema = new Schema(
  {
    full_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, min: 6, select: false },
    avatar: { type: String, default: '' },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    roles: { type: [String], default: ['USER'] },
    token: { type: String, default: '' },
  },
  { timestamps: true },
)

export default model('User', UserSchema)
