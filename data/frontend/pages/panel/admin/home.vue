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
  mounted () {
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
