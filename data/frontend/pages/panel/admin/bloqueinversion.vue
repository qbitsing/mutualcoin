<template>
  <section>
    
  </section>
</template>
<script>
import MutualBlock from '~/components/bloqueAdmin.vue'
import api from '~/plugins/axios'
export default {
  data () {
    return {
      blocks: null,
      coins: null
    }
  },
  layout: 'dashboard',
  middleware: 'auth',
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloques en inversión')
    this.getBlock()
    this.getCoin()
  },
  components: {MutualBlock},
  methods: {
    async getBlock () {
      const res = await api('block/active', {}, 'get', this.$store.state.authToken)
      if (res.status === 200) {
        this.blocks = res.data.blocks
      } else {
        console.log(res)
      }
    },
    async getCoin () {
      const res = await api('coin/all', {}, 'get', this.$store.state.authToken)
      if (res.status === 200) {
        console.log(res.data.coins)
        this.coins = res.data.coins
      } else {
        console.log(res)
      }
    }
  }
}
</script>
