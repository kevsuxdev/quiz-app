import express from 'express'
import { allQuizzes, createQuiz, quizDetails, userQuiz } from '../controllers/quiz.controller.js'

const router = express.Router()

router.get('/:quizId', quizDetails)
router.get('/all', allQuizzes)
router.get('/', userQuiz)
router.post('/', createQuiz)

export default router
