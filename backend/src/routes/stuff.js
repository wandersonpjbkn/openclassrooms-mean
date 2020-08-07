// external
const express = require('express')
const router = express.Router()

// internal
const controller = require('../controllers/stuff')

// create
router.post('/api/stuff/', controller.createStuff)

// get all
router.get('/api/stuff/', controller.getStuffs)

// get one
router.get('/api/stuff/:id', controller.getOneStuff)

// update
router.put('/api/stuff/:id', controller.updateStuff)

// delete
router.delete('/api/stuff/:id', controller.deleteStuff)

module.exports = router
