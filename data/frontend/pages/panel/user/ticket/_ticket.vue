<template>
  <p>I am a ticket</p>
</template>
<script>
  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    created () {
      this.$store.commit('TITLE_VIEW', 'Ticket')
    }
  }
</script>
