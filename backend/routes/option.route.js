import express from 'express'
import { allOptions, createOptions } from '../controllers/option.controller.js'

const router = express.Router()

router.get('/', allOptions)
router.post('/', createOptions)

export default router
