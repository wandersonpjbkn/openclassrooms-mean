// env
require('dotenv').config()

const mongoose = require('mongoose')

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

module.exports = mongoose
