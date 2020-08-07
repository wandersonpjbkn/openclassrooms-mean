// external
const express = require('express')
const router = express.Router()

// internal
const controller = require('../controllers/user')

const route = '/auth'

// register
router.post(`${route}/signup`, controller.signup)

// login
router.post(`${route}/login`, controller.login)

module.exports = router
