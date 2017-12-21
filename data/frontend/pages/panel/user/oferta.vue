<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocks" :key="block.reference" class="pt-2">
        <mutual-bloque :data="block"></mutual-bloque>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloque from '~/components/bloque.vue'
// import api from '~/plugins/axios'
import {mapState} from 'vuex'
export default{
  computed: mapState(['blocks', 'coins', 'authToken']),
  components: { MutualBloque },
  layout: 'dashboard',
  async created () {

  },
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
  }
}
</script>
