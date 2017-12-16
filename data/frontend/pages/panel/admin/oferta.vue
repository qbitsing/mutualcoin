<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocks" :key"block.reference" class="pt-2">
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
        reference: 123,
        moneda: 'BTC',
        cant: 10,
        weeks: 12,
        inverted: 8.3
      }, {
        reference: 1234,
        moneda: 'ETH',
        cant: 15,
        weeks: 12,
        inverted: 8
      }, {
        reference: 213,
        moneda: 'ETH',
        cant: 15,
        weeks: 12,
        inverted: 8
      }, {
        reference: 13213,
        moneda: 'BTC',
        cant: 3,
        weeks: 12,
        inverted: 8
      }, {
        reference: 12323,
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
