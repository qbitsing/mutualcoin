'use strict'

const bodyParser = require('body-parser')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const asyncify = require('express-asyncify')
const api = require('./api')
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express')
const schema = require('./graphql')
const db = require('mutualcoin-db')
const port = process.env.PORT || 3300
const app = asyncify(express())
const server = http.createServer(app)
const config = require('./config')

async function init() {
  let connect = await db(config.db)

  return schema(connect)
}

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})
init().then(s => {
  app.use('/graphql', graphqlExpress({ schema: s }))
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
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
})
