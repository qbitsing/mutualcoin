<template>
<div>
  <h1>{{message}}</h1>
</div>
</template>
<script>
import socket from '~/plugins/socket'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      message: 'ola',
      client: null
    }
  },
  methods: {
    async conectSocket () {
      const client = await socket().catch((err) => {
        console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
      })
      client.emit('suscribe', 'block/change/state')
    },
    subscribe () {
      // this.client.emit('suscribe', 'block/change/state')
    }

  },
  created () {
    this.conectSocket()
    this.subscribe()
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
