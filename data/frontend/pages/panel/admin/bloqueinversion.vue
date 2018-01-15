<template>
  <section>
    <v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloques en inversion</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6 sm4 lg3 v-for="block in blocks.active" :key="block.reference" class="pt-2" >
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
            <v-flex xs6 sm4 lg3 v-for="block in blocks.waiting" :key="block.reference" class="pt-2">
              <mutual-block  :data="block" />
            </v-flex>
            <v-flex xs6 sm4 lg3 v-for="block in blocks.running" :key="block.reference" class="pt-2">
              <mutual-block  :data="block" />
            </v-flex>
            <v-flex xs6 sm4 lg3 v-for="block in blocks.paused" :key="block.reference" class="pt-2">
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
import socket from '~/plugins/socket'
export default {
  data () {
    return {
      coins: null,
      nameCoin: null,
      client: null
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'blocks'],
  computed: mapState(['blocks']),
  created () {
    this.conectSocket()
    this.$store.commit('TITLE_VIEW', 'Bloques en inversión')

    // this.getBlock()
  },
  components: {MutualBlock},
  methods: {
    async conectSocket () {
      this.client = await socket().catch((err) => {
        console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
      })
      console.log(this.client)
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
