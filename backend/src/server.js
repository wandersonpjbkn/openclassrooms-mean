// env
require('dotenv').config()

// external
const http = require('http')

// internal
const app = require('./app')

const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

const port = normalizePort(process.env.PORT || '3000')

app.set('port', port)

const errorHandler = err => {
  if (err.syscall !== 'listen') throw err

  const address = server.address()
  const bind = typeof address === 'string'
    ? `pipe ${address}`
    : `port ${port}`

  switch (err.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`)
      process.exit(1)

    case 'EADDRINUSE':
      console.log(`${bind} is already in use`)
      process.exit(1)
  
    default:
      throw err
  }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string'
    ? `pipe ${address}`
    : `port ${port}`
  
  console.log(`Listening on ${bind}`)
})

server.listen(port)
