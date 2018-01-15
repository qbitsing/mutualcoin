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
      message: 'ola'
    }
  },
  methods: {
    async conectSocket () {
      const client = await socket().catch((err) => {
        console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
      })
      console.log(client)
    }
  },
  created () {
    this.conectSocket()
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
