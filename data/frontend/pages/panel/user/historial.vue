<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 lg3 v-for="block in blocksU" :key="block.block" class="pt-2">
        <mutual-bloque-historial :data="block"></mutual-bloque-historial>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MutualBloqueHistorial from '~/components/bloqueHistorial.vue'
import api from '~/plugins/axios'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      blocksU: [],
      inversions: []
    }
  },
  components: { MutualBloqueHistorial },
  layout: 'dashboard',
  middleware: ['auth', 'blocks'],
  methods: {
    filerBlock (uuid) {
      const block = this.blocks.filter(e => e.uuid === uuid)
      return block[0]
    }
  },
  computed: mapState(['authUser', 'authToken', 'blocks']),
  async created () {
    const res = await api(`/blockUser/user/${this.authUser.uuid}`, {}, 'get', this.authToken)
    console.log(res)
    this.inversions = res.data.blocksUsers
    this.blocksU = this.inversions.map(e => {
      e.objBlock = this.filerBlock(e.block)
      return e
    })
  },
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Historial')
  }
}
</script>