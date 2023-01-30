import mongoose from 'mongoose'

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log(`MongoDB Connected!`)
  })

  mongoose.connection.on('connected', () => {
    console.log('mongoose connected to DB')
  })

  mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected')
  })

  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })
}

export default connectDB
