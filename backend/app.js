// env
require('dotenv').config()

// external
const express = require('express')
const mongoose = require('mongoose')
const { json } = require('body-parser')

// internal
const Thing = require('./models/thing')

const app = express()

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    w: 'majority',
    retryWrites: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas')
  })
  .catch(err => {
    console.log('Unable to connect to MongoDB Atlas')
    console.error(err)
  })

app.use(json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.post('/api/stuff', (req, res, next) => {
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

app.get('/api/stuff/:id', (req, res, next) => {
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

app.put('/api/stuff/:id', (req, res, next) => {
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

app.delete('/api/stuff/:id', (req, res, next) => {
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

app.use('/api/stuff', (req, res, next) => {
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

module.exports = app
