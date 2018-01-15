'use strict'

const socket = require('socket.io-client')
const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || '1600'
let client = null

function getSocket () {
  return new Promise(function (resolve, reject) {
    if (client && client.connected) {
      resolve(client)
    } else {
      client = socket(`${HOST}:${PORT}`, {
        reconnection: false
      })

      client.on('connect', () => {
        resolve(client)
      })

      client.on('connect_error', (error) => {
        reject(error)
      })
    }
  })
}

module.exports = getSocket
