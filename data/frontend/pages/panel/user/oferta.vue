<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocks.active" :key="block.uuid" v-if="block.amountLeft>0" class="pt-2">
        <mutual-bloque :data="block"></mutual-bloque>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloque from '~/components/bloque.vue'
import {mapState} from 'vuex'
import realTime from '~/plugins/userRealTime'
export default {
  middleware: ['auth', 'blocks'],
  components: {MutualBloque},
  layout: 'dashboard',
  computed: mapState(['userInversions', 'blocks', 'tickets']),
  created () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
    realTime(this)
  }
}
</script>
