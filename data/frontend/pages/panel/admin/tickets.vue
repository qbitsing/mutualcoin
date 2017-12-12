<template>
  <h1>ticket</h1>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Ticket')
  }
}
</script>