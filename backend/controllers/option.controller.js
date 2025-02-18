import asyncHandler from 'express-async-handler'
import Option from '../models/option.model.js'

export const allOptions = asyncHandler(async (request, response) => {
  const options = await Option.find({})

  return response.status(200).json({
    error: false,
    message: 'Options retrieved successfully.',
    options,
  })
})

export const createOptions = asyncHandler(async (request, response) => {
  const { questionId, optionText, isCorrect } = request.body

  if (!questionId) {
    return response.status(400).json({
      error: false,
      message: 'Please select a question to set an option.',
    })
  }

  if (!optionText) {
    return response.status(400).json({
      error: false,
      message: 'Please enter a option.',
    })
  }

  if (!isCorrect) {
    return response.status(400).json({
      error: false,
      message: 'Please select desired answer.',
    })
  }

  const newOption = await Option.create({
    questionId,
    optionText,
    isCorrect,
  })

  return response.status(201).json({
    error: false,
    message: 'Option created successfully.',
    option: newOption,
  })
})
