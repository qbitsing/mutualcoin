'use strict'

const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')
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
const ensure = require('express-jwt')
const secret = {
  secret: config.secret,
  credentialsRequired: false
}

async function init() {
  let connect = await db(config.db)

  return schema(connect)
}

app.use(bodyParser.json({ limit: '5mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
init().then(s => {
  app.use('/graphql',
    ensure(secret),
    graphqlExpress(req => ({
      schema: s,
      context: req
    })
    )
  )
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
