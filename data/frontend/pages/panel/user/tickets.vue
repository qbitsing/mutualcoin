<template>
  <p>tickets</p>
</template>
<script>
  export default {
    layout: 'dashboard',
    middlewae: 'auth',
    created () {
      this.$store.commit('TITLE_VIEW', 'Tickets')
    }
  }
</script>