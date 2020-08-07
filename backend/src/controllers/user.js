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
          .finally(() => { console.log('signup finished') })
      })
  },

  login: (req, res) => {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if (!user) return res.status(401).json({
          err: new Error('User not found!')
        })

        bcrypt
          .compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) return res.status(401).json({
              err: new Error('Invalid password!')
            })

            res
              .status(200)
              .json({
                userID: user._id,
                token: 'token'
              })
          })
          .catch(err => {
            res
              .status(500)
              .json({ err: err })
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({ err: err })
      })
      .finally(() => { console.log('login finished') })
  }
}
