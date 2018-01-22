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
      nameCoin: null
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'blocks'],
  computed: mapState(['blocks']),
  created () {
    this.socketInvestment()
    this.$store.commit('TITLE_VIEW', 'Bloques en inversión')
  },
  components: {MutualBlock},
  methods: {
    async socketInvestment () {
      const client = await socket().catch((err) => {
        console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
      })
      if (client.connected) {
        client.emit('suscribe', 'block/user/add')
        client.removeListener('block/user/add')
        client.on('block/user/add', (data) => {
          for (var prop in this.blocks) {
            if (this.blocks[prop]) {
              let index = this.blocks[prop].findIndex(block => block.uuid === data._block.uuid)
              if (index !== -1) {
                if (this.blocks[prop][index].state === data._block.state) {
                  this.blocks[prop][index].amountLeft = data._block.amountLeft
                  this.blocks[prop][index].state = data._block.state
                } else {
                  this.blocks[prop][index].amountLeft = data._block.amountLeft
                  this.blocks[prop][index].state = data._block.state
                  const block = this.blocks[prop][index]
                  this.blocks[prop].splice(index, 1)
                  this.blocks[data._block.state].push(block)
                }
                break
              }
            }
          }
        })
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
