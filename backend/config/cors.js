// external
const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  
  if ('OPTIONS' === req.method) return res.sendStatus(200)
  
  next()
})

module.exports = router
