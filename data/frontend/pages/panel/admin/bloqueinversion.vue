<template>
  <section>
    <v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloques en inversion</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6 sm4 lg3 v-for="block in blocks" :key="block.reference" class="pt-2" v-if="block.state === 'active'">
              <mutual-block :data="block" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Bloques Invertidos</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6 sm4 lg3 v-for="block in blocks" :key="block.reference" class="pt-2" v-if="block.state === 'waiting' || block.state === 'running' || block.state === 'paused'">
              <mutual-block  :data="block" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    
  </section>
</template>
<script>
import MutualBlock from '~/components/bloqueAdmin.vue'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      coins: null,
      nameCoin: null
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'blocks'],
  computed: mapState(['blocks']),
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloques en inversión')
    // this.getBlock()
  },
  components: {MutualBlock},
  methods: {
    // async getBlock () {
    //   if (res.status === 200) {
    //     this.coins = this.$store.state.coins
    //     this.blocks = res.data.blocks
    //     this.blocks.forEach((ele, index) => {
    //       this.nameMoneda(ele.coin)
    //       this.blocks[index].coin = this.nameCoin
    //     })
    //   } else {
    //     console.log(res)
    //   }
    // },
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
