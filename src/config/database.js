import mongoose from 'mongoose'

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log(`MongoDB Connected!`)
  })
}

export default connectDB
