<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocks" class="pt-2">
        <mutual-bloque-admin :data="block"></mutual-bloque-admin>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloqueAdmin from '~/components/bloqueAdmin.vue'
export default{
  data () {
    return {
      blocks: [{
        moneda: 'BTC',
        cant: 10,
        weeks: 12,
        inverted: 8.3
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
  components: { MutualBloqueAdmin },
  layout: 'dashboard',
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
  }
}
</script>
