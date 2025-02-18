import express from 'express'
import { allUsers, createUser } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', allUsers)
router.post('/', createUser)

export default router
