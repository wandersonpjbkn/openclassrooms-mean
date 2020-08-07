// external
const express = require('express')
const router = express.Router()

// internal
const controller = require('../controllers/stuff')

const route = '/stuff'

// create
router.post(`${route}/`, controller.createStuff)

// get all
router.get(`${route}/`, controller.getStuffs)

// get one
router.get(`${route}/:id`, controller.getOneStuff)

// update
router.put(`${route}/:id`, controller.updateStuff)

// delete
router.delete(`${route}/:id`, controller.deleteStuff)

module.exports = router
