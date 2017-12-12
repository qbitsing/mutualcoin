<template>
  <h1>transaciones</h1>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Transaciones')
  }
}
</script>