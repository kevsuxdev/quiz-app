import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

export const allUsers = asyncHandler(async (request, response) => {
  const users = await User.find({})

  return response.status(200).json({
    error: false,
    message: 'Users retrieved successfully.',
    users,
  })
})

export const createUser = asyncHandler(async (request, response) => {
  const { firstName, lastName, email, password, confirmPassword } = request.body

  if (!firstName) {
    return response.status(401).json({
      error: true,
      message: 'Please enter your first name.',
    })
  }

  if (!lastName) {
    return response.status(401).json({
      error: true,
      message: 'Please enter your last name.',
    })
  }

  if (!email) {
    return response.status(401).json({
      error: true,
      message: 'Please enter your a valid email address.',
    })
  }

  if (!password) {
    return response.status(401).json({
      error: true,
      message: 'Please enter a password',
    })
  }

  if (password !== confirmPassword) {
    return response.status(401).json({
      error: true,
      message: 'Password do not match.',
    })
  }

  const hashPassword = bcrypt.hashSync(password, 10)

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  })

  return response.status(201).json({
    error: false,
    message: 'User created successfully.',
    user: newUser,
  })
})
