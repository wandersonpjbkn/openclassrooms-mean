// external
const express = require('express')
const router = express.Router()

// internal
const controller = require('../controllers/products')

// create
router.post('/api/products/', controller.createProduct)

// get all
router.get('/api/products/', controller.getProducts)

// get one
router.get('/api/products/:id', controller.getOneProduct)

// update
router.put('/api/products/:id', controller.updateProduct)

// delete
router.delete('/api/products/:id', controller.deleteProduct)

module.exports = router
