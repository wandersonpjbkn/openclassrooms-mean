// internal
const Product = require('../models/product')

module.exports = {
  createProduct: (req, res) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock
    })
  
    product
      .save()
      .then(product => {
        res
          .status(201)
          .json({ product })
      })
      .catch(err => {
        res
          .status(400)
          .json({ err: err })
      })
      .finally(() => { console.log('create product finished') })
  },

  getProducts: (req, res) => {
    Product
      .find()
      .then(products => {
        res
          .status(200)
          .json({ products })
      })
      .catch(err => {
        res
          .status(400)
          .json({ err: err })
      })
      .finally(() => { console.log('get all products finished') })
  },

  getOneProduct: (req, res) => {
    Product
      .findOne({ _id: req.params.id })
      .then(product => {
        res
          .status(200)
          .json({ product })
      })
      .catch(err => {
        res
          .status(400)
          .json({ err: err })
      })
      .finally(() => { console.log('get one product finished') })
  },

  updateProduct: (req, res) => {
    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock
    })
  
    Product
      .updateOne({ _id: req.params.id }, product)
      .then(() => {
        res
          .status(200)
          .json({ message: 'Modified!' })
      })
      .catch(err => {
        res
          .status(400)
          .json({ err: err })
      })
      .finally(() => { console.log('update product finished') })
  },
  
  deleteProduct: (req, res) => {
    Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res
        .status(200)
        .json({ message: 'Deleted!' })
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: err })
    })
    .finally(() => { console.log('delete product finished') })
  }
}
