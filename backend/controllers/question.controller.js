import asyncHandler from 'express-async-handler'
import Question from '../models/question.model.js'

export const allQuestions = asyncHandler(async (request, response) => {
  const questions = await Question.find({})

  return response.status(200).json({
    error: false,
    message: 'Questions retrieved successfully.',
    questions,
  })
})

export const createQuestion = asyncHandler(async (request, response) => {
  const { quizId, userId, questionText, questionType } = request.body

  if (!quizId) {
    return response.status(400).json({
      error: true,
      message: 'Please select a quiz repository.',
    })
  }

  if (!userId) {
    return response.status(400).json({
      error: true,
      message: 'User not found.',
    })
  }

  if (!questionText) {
    return response.status(400).json({
      error: true,
      message: 'Please enter a question.',
    })
  }

  const newQuestion = await Question.create({
    userId,
    quizId,
    questionText,
    questionType: questionType ? questionType : null,
  })

  return response.status(201).json({
    error: false,
    message: 'Question created successfully.',
    question: newQuestion,
  })
})
