// internal 
const Thing = require('../models/thing')

module.exports = {
  createStuff: (req, res) => {
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
      .finally(() => { console.log('stuff created') })
  },

  getStuffs: (req, res) => {
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
      .finally(() => { console.log('stuffs getted') })
  },

  getOneStuff: (req, res) => {
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
      .finally(() => { console.log('stuff getted') })
  },

  updateStuff: (req, res) => {
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
      .finally(() => { console.log('stuff updated') })
  },

  deleteStuff: (req, res) => {
    Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res
        .status(200)
        .json({ message: 'Thing deleted successfully' })
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: err })
    })
    .finally(() => { console.log('stuff deleted') })
  }
}