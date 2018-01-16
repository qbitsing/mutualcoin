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
import realTime from '~/plugins/clientRealTime'
export default {
  middleware: ['auth', 'blocks'],
  components: {MutualBloque},
  layout: 'dashboard',
  computed: mapState(['blocks', 'authToken', 'userInversions']),
  data () {
    return {
      blocksActive: []
    }
  },
  methods: {
    // async conectSocket () {
    //   const client = await socket().catch((err) => {
    //     console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
    //   })
    //   if (client.connected) {
    //     console.log(client)
    //     client.emit('suscribe', 'block/change/state')
    //     client.emit('suscribe', 'block/user/add')
    //     client.on('block/change/state', res => {
    //       console.log(res)
    //       for (const iterator of this.userInversions) {
    //         if (iterator.block === res.uuid) {
    //           iterator._block.state = res.state
    //           break
    //         }
    //       }
    //       if (res.state === 'waiting') {
    //         this.blocks.active = this.blocks.active.filter(e => e.uuid !== res.uuid)
    //       } else if (res.state === 'active') {

    //       }
    //     })
    //     client.on('block/user/add', res => {
    //       console.log(res)
    //     })
    //   }
    // }
  },
  // async beforeDestroy () {
  //   const client = await socket().catch((err) => {
  //     console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
  //   })
  //   if (client.connected) {
  //     client.emit('unsuscribe', 'block/change/state')
  //   }
  // },
  created () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
    realTime(this)
  }
}
</script>
