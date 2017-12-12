<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocks" class="pt-2">
        <mutual-bloque :data="block"></mutual-bloque>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloque from '~/components/bloque.vue'
export default{
  data () {
    return {
      blocks: [{
        moneda: 'BTC',
        cant: 10,
        weeks: 12,
        inverted: 8
      }, {
        moneda: 'ETH',
        cant: 15,
        weeks: 12,
        inverted: 8
      }, {
        moneda: 'ETH',
        cant: 15,
        weeks: 12,
        inverted: 8
      }, {
        moneda: 'BTC',
        cant: 3,
        weeks: 12,
        inverted: 8
      }, {
        moneda: 'ETH',
        cant: 15,
        weeks: 12,
        inverted: 8
      }]
    }
  },
  components: { MutualBloque },
  layout: 'dashboard',
  middleware: 'auth',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
  }
}
</script>
