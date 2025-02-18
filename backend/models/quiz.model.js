import mongoose from 'mongoose'

const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
  },
  { timestamps: true }
)

const Quiz = mongoose.model('Quiz', QuizSchema)

export default Quiz
