// external
const express = require('express')
const router = express.Router()

// internal
const Thing = require('../models/thing')

// create
router.post('/api/stuff', (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  })

  thing
    .save()
    .then(() => {
      res
        .status(201)
        .json({ message: 'Post saved successfully' })
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: err })
    })
})

// get all
router.use('/api/stuff', (req, res, next) => {
  Thing
    .find()
    .then(things => {
      res
        .status(200)
        .json(things)
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: err })
    })
})

// get one
router.get('/api/stuff/:id', (req, res, next) => {
  Thing
    .findOne({ _id: req.params.id })
    .then(thing => {
      res
        .status(200)
        .json(thing)
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: err })
    })
})

// update
router.put('/api/stuff/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  })

  Thing
    .updateOne({ _id: req.params.id }, thing)
    .then(things => {
      res
        .status(200)
        .json(things)
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: err })
    })
})

// delete
router.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
  .then(() => {
    res
      .status(200)
      .json({ message: 'Thind deleted successfully' })
  })
  .catch(err => {
    res
      .status(400)
      .json({ err: err })
  })
})


module.exports = router
