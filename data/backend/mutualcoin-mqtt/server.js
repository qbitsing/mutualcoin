'use strict'

const debug = require('debug')('mutualcoin:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const message = {
  topic: 'message',
  payload: 'this is a message', // or a Buffer
  qos: 0, // 0, 1, or 2
  retain: false // or true
};

const server = new mosca.Server(settings)
const clients = new Map()

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
  clients.set(client.id, true)
})

server.on('clientDisconnected', async (client) => {
  debug(`Client Disconnected: ${client.id}`)
})

server.on('published', (packet, client) => { 
  debug(`Received: ${packet.topic}`)
  debug(`Payload: ${packet.payload}`)
  message.payload = packet.payload
  message.topic = packet.topic
  if (client) { 
    server.publish(message, function () { 
      debug('done')
    })
  }
})

server.on('ready', () => {
  console.log(`${chalk.green('[mutualcoin-mqtt]')} server is running`)
})


server.on('error', handleFatalError)

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
