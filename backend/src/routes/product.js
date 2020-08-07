// external
const express = require('express')
const router = express.Router()

// internal
const controller = require('../controllers/products')

const route = '/products'

// create
router.post(`${route}/`, controller.createProduct)

// get all
router.get(`${route}/`, controller.getProducts)

// get one
router.get(`${route}/:id`, controller.getOneProduct)

// update
router.put(`${route}/:id`, controller.updateProduct)

// delete
router.delete(`${route}/:id`, controller.deleteProduct)

module.exports = router
