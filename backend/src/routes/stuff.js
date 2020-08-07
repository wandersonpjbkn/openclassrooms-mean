// external
const express = require('express')
const router = express.Router()

// internal
const auth = require('../middleware/auth')
const controller = require('../controllers/stuff')

const route = '/stuff'

// create
router.post(`${route}/`, auth, controller.createStuff)

// get all
router.get(`${route}/`, auth, controller.getStuffs)

// get one
router.get(`${route}/:id`, auth, controller.getOneStuff)

// update
router.put(`${route}/:id`, auth, controller.updateStuff)

// delete
router.delete(`${route}/:id`, auth, controller.deleteStuff)

module.exports = router
