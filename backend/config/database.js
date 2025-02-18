import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB Connect: ${connect.connection.host}`)
  } catch (error) {
    console.log(`MongoDB Connection error: ${error}`)
    process.exit(1)
  }
}

export default connectDB
