import io from 'socket.io-client'
export default (ctx, inject) => {
  const socket = io('http://localhost:1600')
  inject('socket', socket)
}
