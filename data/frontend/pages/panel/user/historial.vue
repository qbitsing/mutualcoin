<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocks" :key="block.reference" class="pt-2">
        <mutual-bloque-historial :data="block"></mutual-bloque-historial>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloqueHistorial from '~/components/bloqueHistorial.vue'
import api from '~/plugins/axios'
import {mapState} from 'vuex'
export default{
  data () {
    return {
      blocks: [{
        reference: 213,
        active: true,
        moneda: 'BTC',
        cant: 10,
        start: '12/12/2017',
        finish: '12/03/2018',
        myInversion: 6
      }, {
        reference: 213,
        active: true,
        moneda: 'ETH',
        cant: 15,
        start: '12/12/2017',
        finish: '12/03/2018',
        myInversion: 0.78
      }, {
        reference: 3123,
        active: false,
        moneda: 'ETH',
        cant: 15,
        start: '12/12/2017',
        finish: '12/03/2018',
        myInversion: 0.2
      }, {
        reference: 23123,
        active: true,
        moneda: 'BTC',
        cant: 3,
        start: '12/12/2017',
        finish: '12/03/2018',
        myInversion: 1
      }, {
        reference: 3213,
        active: false,
        moneda: 'ETH',
        cant: 15,
        start: '12/12/2017',
        finish: '12/03/2018',
        myInversion: 0.3
      }]
    }
  },
  components: { MutualBloqueHistorial },
  layout: 'dashboard',
  middleware: 'auth',
  computed: mapState(['authUser', 'authToken', 'blocks']),
  async created () {
    const res = await api(`/blockUser/user/${this.authUser.uuid}`, {}, 'get', this.authToken)
    console.log(res)
  },
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Historial')
  }
}
</script>
