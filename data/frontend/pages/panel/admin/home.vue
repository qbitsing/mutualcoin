<template>
<div>
  <h1>home</h1>
  <a @click="logout">cerrar sesion</a>
</div>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
    }
  },
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
