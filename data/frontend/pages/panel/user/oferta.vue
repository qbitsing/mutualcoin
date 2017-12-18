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
import api from '~/plugins/axios'
export default{
  data () {
    return {
      blocks: []
    }
  },
  components: { MutualBloque },
  layout: 'dashboard',
  async created () {
    const token = this.$store.state.authToken
    const res = await api('block/active', {}, 'get', token)
    for (let block of res.data.blocks) {
      this.blocks.push({
        reference: block._id,
        coin: block.coin.toUpercase(),
        weeks: block.weeks,
        amount: block.amount,
        amountLeft: block.amountLeft
      })
    }
  },
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Oferta')
  }
}
</script>
