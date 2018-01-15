<template>
<div>
  <h1>{{message}}</h1>
</div>
</template>
<script>
// import io from 'socket.io-client'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      message: 'ola'
    }
  },
  created () {
    // const socket = io('http://localhost')
    // console.log(socket)
    console.log(this)
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
