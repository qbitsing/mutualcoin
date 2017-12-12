<template>
<div>
  <h1>home</h1>
  <div class="btcwdgt-chart"></div>
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
  }
}
</script>
