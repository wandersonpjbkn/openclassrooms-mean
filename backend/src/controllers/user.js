// external
const bcrypt = require('bcrypt')

// internal 
const User = require('../models/user')

module.exports = {
  signup: (req, res) => {
    bcrypt
      .hash(req.body.password, 16)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        })

        user
          .save()
          .then(() => {
            res
              .status(201)
              .json({ message: 'User added successfully' })
          })
          .catch(err => {
            res
              .status(500)
              .json({ err: err })
          })
          .finally(() => { console.log('user added') })
      })
  },

  login: (req, res) => {
    //
  }
}
