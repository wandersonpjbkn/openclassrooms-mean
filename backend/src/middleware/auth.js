// env
require('dotenv').config()

// external
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    const userId = decodedToken.userId

    if (req.body.userId && req.body.userId !== userId) throw 'Invalid user ID'

    next()
  } catch (err) {
    res
      .status(401)
      .json({ err: new Error('Invalid request!') })
  }
}
