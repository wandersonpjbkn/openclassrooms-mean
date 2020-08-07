// external
const express = require('express')
const path = require('path')
const { json } = require('body-parser')

// internal
const db = require('./config/db')
const cors = require('./config/cors')
const stuff = require('./routes/stuff')
const product = require('./routes/product')
const user = require('./routes/user')

const app = express()
const route = '/api'

app.use(json())

app.use('/src/assets/imgs', express.static(path.join(__dirname, 'assets', 'imgs')))

// routes
app.use(cors)
app.use(route, stuff)
app.use(route, product)
app.use(route, user)

module.exports = app
