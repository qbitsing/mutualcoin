'use strict'

const socket = require('./')

module.exports = function (message) {
  socket().then(client => {
    client.emit('message', message)
  }).catch(error => {
    console.error(`Error en la conexion con el servidor en tiempo real: ${error.message}`)
  })
}
