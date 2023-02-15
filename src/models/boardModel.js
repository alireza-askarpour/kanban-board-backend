import mongoose from 'mongoose'

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String, default: '📃' },
    title: { type: String, default: 'Untitled' },
    position: { type: Number },
    favourite: { type: Boolean, default: false },
    favouritePosition: { type: Number, default: 0 },
    parent: { type: mongoose.Types.ObjectId, default: undefined, ref: 'board' },
    showInsidePages: { type: Boolean, default: false },
    description: {
      type: String,
      default: `Add description here
        🟢 You can add multiline description
        🟢 Let's start...`,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
       versionKey: false,
       virtuals: true
    }
  },
)

Schema.virtual('children', {
  ref: 'board',
  localField: '_id',
  foreignField: 'parent',
})

function autoPopulate(next) {
  this.populate([{ path: 'children', select: { id: 0, __v: 0 } }])
  next()
}

Schema.pre('findOne', autoPopulate).pre('find', autoPopulate)

export default mongoose.model('board', Schema)
