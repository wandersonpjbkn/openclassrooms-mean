// external
const express = require('express')
const { json } = require('body-parser')

const app = express()

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
