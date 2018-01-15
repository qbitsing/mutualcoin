import io from 'socket.io-client'
let client = null
const getSocket = function () {
  return new Promise(function (resolve, reject) {
    if (client && client.connected) {
      resolve(client)
    } else {
      client = io('http://localhost:1600', {
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
export default getSocket
