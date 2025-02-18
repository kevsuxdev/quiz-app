import express from 'express'
import { allQuestions, createQuestion } from '../controllers/question.controller.js'

const router = express.Router()

router.get('/', allQuestions)
router.post('/', createQuestion)

export default router
