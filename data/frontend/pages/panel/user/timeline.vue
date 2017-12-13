<template>
  <v-layout column>
    <v-card>
      <v-card-title >
        Activo
      </v-card-title>
        <mutual-timeline></mutual-timeline>
    </v-card>
  </v-layout>
</template>
<script>
  import MutualTimeline from '~/components/timeline.vue'
  export default {
    middleware: 'auth',
    layout: 'dashboard',
    data () {
      return {
        dialog: false
      }
    },
    components: { MutualTimeline },
    beforeMount () {
      this.$store.commit('TITLE_VIEW', 'Línea del tiempo')
    }
  }
</script>
<style lang="css">
</style>
