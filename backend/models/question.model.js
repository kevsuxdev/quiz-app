import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: false,
      default: 'Identification',
    },
    questionAnswer: {
      type: String,
      required: false,
      default: null,
    },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
  },
  { timestamps: true }
)

const Question = mongoose.model('Question', QuestionSchema)

export default Question
