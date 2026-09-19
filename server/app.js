const express = require('express')

const app = express()

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/api/message', (req, res) => {
  res.status(200).json({ message: 'Hello from the Express API' })
})

module.exports = app
