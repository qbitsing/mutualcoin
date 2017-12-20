<template>
  
</template>
<script>
export default {
  validate ({params}) {
    console.log(params)
  },
  layout: 'dashboard',
  middleware: 'auth',
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloques en inversión')
    this.getBlock()
  }
}
</script>
