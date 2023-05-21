import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema(
  {
    access: { type: String, enum: ['view', 'edit'], default: 'view' },
    user: { type: mongoose.Types.ObjectId, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const BoardSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: undefined },
    title: { type: String, default: 'Untitled' },
    position: { type: Number },
    favourite: { type: Boolean, default: false },
    favouritePosition: { type: Number, default: 0 },
    description: { type: String, default: undefined },
    cover: { type: String, default: undefined },
    members: { type: [MemberSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export default mongoose.model('board', BoardSchema)
