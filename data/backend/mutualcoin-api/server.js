'use strict'

const bodyParser = require('body-parser')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const asyncify = require('express-asyncify')
const api = require('./api')

const port = process.env.PORT || 3300
const app = asyncify(express())
const server = http.createServer(app)

app.use(bodyParser.json({ limit: '5mb' }))
app.use('/api', api)

// Express ErrorHandel

app.use((err, req, res, next) => {
  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

server.listen(port, () => {
  console.log(`${chalk.green('[mutualcoin-api]')} server listening on ${chalk.blue('http://localhost:' + port)}`)
})
