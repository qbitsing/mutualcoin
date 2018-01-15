<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocksActive" :key="block.uuid" v-if="block.amountLeft>0" class="pt-2">
        <mutual-bloque :data="block"></mutual-bloque>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloque from '~/components/bloque.vue'
import {mapState} from 'vuex'
import socket from '~/plugins/socket'
export default {
  middleware: ['auth', 'blocks', 'userInversions'],
  components: {MutualBloque},
  layout: 'dashboard',
  computed: mapState(['blocks', 'authToken']),
  data () {
    return {
      blocksActive: []
    }
  },
  methods: {
    async conectSocket () {
      const client = await socket().catch((err) => {
        console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
      })
      if (client.connected) {
        client.emit('suscribe')
      }
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
    this.conectSocket()
    this.blocksActive = this.blocks.active
  }
}
</script>
