// env
require('dotenv').config()

// external
const express = require('express')
const mongoose = require('mongoose')
const { json } = require('body-parser')

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
  console.log(req.body)
  res
    .status(201)
    .json({ message: 'Thing created successfully' })
})

app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'quwiquwiuq',
      title: 'My first thing',
      description: 'All the info about my first thing',
      imageUrl: 'https://source.unsplash.com/weekly?tech',
      price: 8500,
      userId: 'qoeiqoewi'
    },
    {
      _id: 'zxcmzncmzn',
      title: 'My second thing',
      description: 'All the info about my second thing',
      imageUrl: 'https://source.unsplash.com/weekly?trip',
      price: 4700,
      userId: 'lgkjglhkj'
    },
    {
      _id: 'falkfnakl',
      title: 'My third thing',
      description: 'All the info about my third thing',
      imageUrl: 'https://source.unsplash.com/weekly?city',
      price: 8900,
      userId: 'aldaasdad'
    }
  ]

  res
    .status(200)
    .json(stuff)
})

module.exports = app
