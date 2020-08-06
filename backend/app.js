// external
const express = require('express')
const { json } = require('body-parser')

// internal
const db = require('./config/db')
const cors = require('./config/cors')
const stuff = require('./routes/stuff')
const product = require('./routes/product')

const app = express()

app.use(json())

// routes
app.use(cors)
app.use(stuff)
app.use(product)

module.exports = app
