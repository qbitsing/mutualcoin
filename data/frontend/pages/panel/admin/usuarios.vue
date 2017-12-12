<template>
  <h1>usuarios</h1>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Usuarios')
  }
}
</script>