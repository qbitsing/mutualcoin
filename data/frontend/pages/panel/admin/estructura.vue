<template>
  <h1>estructura</h1>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Estructura')
  }
}
</script>