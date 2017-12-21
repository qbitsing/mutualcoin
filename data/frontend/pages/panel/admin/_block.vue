<template>
  <section>
    <v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloques en inversion</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex offset-xs1 xs4 sm2>
          <v-card flat>
            <v-layout align-center>
              <img class="coin" :src="`/${block.coin}.png`" alt="">
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex offset-xs1 offset-sm0 xs5 sm3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card flat>
                <v-card-title primary class="title no-padding">Estado</v-card-title>
                <v-card-text class="no-padding" v-text="block.state"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Inversiones</v-card-title>
                <v-card-text class="no-padding" v-text="`${block.amount - block.amountLeft} ${block.coin}`"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Monto</v-card-title>
                <v-card-text v-text="`${block.amount} ${block.coin}`" class="no-padding"></v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
              
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
            
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    
  </section>
</template>
<script>
import {mapState} from 'vuex'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'blocks', 'coins'],
  data () {
    return {
      block: null
    }
  },
  computed: mapState(['blocks', 'coins']),
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloque')
    this.blocks.forEach((ele, index) => {
      if (ele.uuid === this.$router.history.current.params.block) {
        this.block = ele
        this.coins.forEach((ele, index) => {
          if (ele.uuid === this.block.coin) {
            console.log(ele.name)
            this.block.coin = ele.name
          }
        })
      }
    })
  }
}
</script>
<style>
.wp {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}
.title, .mutual-text{
  padding: 7px !important;
}
.mutual-text{
  padding-top: 0 !important;
}
.coin{
  width: 75% !important;
}
.wel {
  min-width: 0;
  width: 100% !important;
  margin: 0 !important;
  border:0;
  border-radius: 0 !important;
}
.no-padding {
  padding: 0 !important;
}
.mutual-table {
  margin: 20px 0;
}
@media (max-width: 810px) {
  .coin {
    width: 90% !important;
  }
}
</style>

