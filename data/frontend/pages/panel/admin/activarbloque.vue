<template>
  <section>

  </section>
</template>
<script>
export default {
  layout: 'dashboard',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Registro de bloque')
  }
}
</script>
