<template>
<div>
  <h1>{{message}}</h1>
</div>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      message: 'Hola'
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
