<template>
  <section>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6 sm4 lg3 v-for="block in blocks" :key="block.reference" class="pt-2">
          <mutual-block  :data="block"  />
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>
<script>
import MutualBlock from '~/components/bloqueAdmin.vue'
import api from '~/plugins/axios'
export default {
  data () {
    return {
      blocks: null,
      coins: null,
      nameCoin: null
    }
  },
  layout: 'dashboard',
  middleware: 'auth',
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloques en inversión')
    this.getBlock()
  },
  components: {MutualBlock},
  methods: {
    async getBlock () {
      const res = await api('block/active', {}, 'get', this.$store.state.authToken)
      if (res.status === 200) {
        this.coins = this.$store.state.coins
        this.blocks = res.data.blocks
        this.blocks.forEach((ele, index) => {
          this.nameMoneda(ele.coin)
          this.blocks[index].coin = this.nameCoin
        })
      } else {
        console.log(res)
      }
    },
    nameMoneda (uuid) {
      this.coins.forEach((ele, index) => {
        if (ele.uuid === uuid) {
          this.nameCoin = ele.name
          return this.nameCoin
        }
      })
    }
  }
}
</script>
