// external
const fs = require('fs')

// internal 
const Thing = require('../models/thing')

module.exports = {
  createStuff: (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`

    req.body.thing = JSON.parse(req.body.thing)

    const thing = new Thing({
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: `${url}/src/assets/imgs/${req.file.filename}`,
      price: req.body.thing.price,
      userId: req.body.thing.userId
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
      .finally(() => { console.log('create stuff finished') })
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
      .finally(() => { console.log('get all stuffs finished') })
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
      .finally(() => { console.log('get one stuff finished') })
  },

  updateStuff: (req, res) => {
    let thing = new Thing({ _id: req.params.id })

    if (req.file) {
      const url = `${req.protocol}://${req.get('host')}`

      req.body.thing = JSON.parse(req.body.thing)

      thing = {
        _id: req.params.id,
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: `${url}/src/assets/imgs/${req.file.filename}`,
        price: req.body.thing.price,
        userId: req.body.thing.userId
      }
    } else {
      thing = {
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
      }
    }

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
      .finally(() => { console.log('update stuff finished') })
  },

  deleteStuff: (req, res) => {
    Thing
      .findOne({_id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/imgs/')[1]

        fs.unlink(`src/assets/imgs/${filename}`, () => {
          Thing
            .deleteOne({ _id: req.params.id })
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
            .finally(() => { console.log('delete stuff finished') })
        })
      })
  }
}