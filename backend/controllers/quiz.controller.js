import asyncHandler from 'express-async-handler'
import Quiz from '../models/quiz.model.js'
import Question from '../models/question.model.js'
import Option from '../models/option.model.js'

export const allQuizzes = asyncHandler(async (request, response) => {
  const quizzes = await Quiz.find()

  return response.status(200).json({
    error: false,
    message: 'Retrieve all the quizzes',
    quizzes,
  })
})

export const userQuiz = asyncHandler(async (request, response) => {
  // const userId = request.user.id
  const quizzes = await Quiz.find({})

  return response.status(200).json({
    error: false,
    message: 'User retrieved the quiz successfully.',
    quizzes,
  })
})

export const createQuiz = asyncHandler(async (request, response) => {
  const { userId, title, description, questions } = request.body

  if (!title) {
    return response.status(401).json({
      error: true,
      message: 'Please enter a title.',
    })
  }

  if (!description) {
    return response.status(401).json({
      error: true,
      message: 'Please enter a description.',
    })
  }

  // Create Quiz
  const newQuiz = await Quiz.create({
    userId,
    title,
    description,
  })

  // Store here all the question id used for quiz
  const questionIdx = []

  for (const quest of questions) {
    // Create the question
    const question = await Question.create({
      questionText: quest.questionText,
      questionType: quest.questionType || 'Identification',
      quizId: newQuiz._id,
      userId,
    })

    if (quest.questionType === 'Identification') {
      // Check if the question type is Idenfitication
      question.questionAnswer = quest.questionAnswer
    } else {
      // Create options if the question type is not Identification
      const optionIdx = []
      for (const opt of quest.options) {
        const option = await Option.create({
          optionText: opt.optionText,
          isCorrect: opt.isCorrect,
          questionId: question._id,
        })
        // Insert the option id to the optionIdx array
        optionIdx.push(option._id)
      }
      // Set the question options
      question.options = optionIdx
    }

    await question.save()
    questionIdx.push(question._id)
  }

  // Insert the questions ids to quiz
  newQuiz.questions = questionIdx
  await newQuiz.save()

  return response.status(201).json({
    message: 'Quiz created successfully.',
    quiz: newQuiz,
  })
})

export const quizDetails = asyncHandler(async (request, response) => {
  const { quizId } = request.params

  const quiz = await Quiz.findById(quizId)
    .populate({
      path: 'questions',
      select: 'questionText questionType questionAnswer',
      populate: {
        path: 'options',
        select: 'optionText isCorrect',
      },
    })
    .exec()

  return response.status(200).json({
    error: false,
    message: 'The detail of the quiz has been retrieved successfully.',
    quiz,
  })
})
