import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.js'

import quizRoute from './routes/quiz.route.js'
import userRoute from './routes/user.route.js'
import questionRoute from './routes/question.route.js'
import optionRoute from './routes/option.route.js'

import { errorHandler, notFound } from './middlewares/errorMiddleware.js'


dotenv.config()
connectDB()
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/user', userRoute)
app.use('/quiz', quizRoute)
app.use('/question', questionRoute)
app.use('/option', optionRoute)

app.use(errorHandler)
app.use(notFound)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
