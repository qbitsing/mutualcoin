<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocksActive" :key="block.reference" class="pt-2">
        <mutual-bloque :data="block"></mutual-bloque>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloque from '~/components/bloque.vue'
// import api from '~/plugins/axios'
import {mapState} from 'vuex'
export default {
  middleware: ['auth', 'blocks'],
  components: {MutualBloque},
  layout: 'dashboard',
  computed: mapState(['blocks', 'authToken']),
  data () {
    return {
      blocksActive: []
    }
  },
  beforeMount () {
    this.blocksActive = this.blocks.filter(b => b.state === 'active' && b.amountLeft > 0)
    this.$store.commit('TITLE_VIEW', 'Oferta')
  }
}
</script>
