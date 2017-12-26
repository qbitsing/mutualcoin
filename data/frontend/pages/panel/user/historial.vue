<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in userInversions" :key="block.block" class="pt-2 pl-1 pr-1">
        <mutual-bloque-historial :data="block"></mutual-bloque-historial>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloqueHistorial from '~/components/bloqueHistorial.vue'
import {mapState} from 'vuex'
export default {
  components: { MutualBloqueHistorial },
  layout: 'dashboard',
  middleware: ['auth', 'blocks', 'userInversions'],
  computed: mapState(['blocks', 'userInversions']),
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Historial')
  }
}
</script>