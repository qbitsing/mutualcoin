<template>
  <section>
    <!--<v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloques en inversion</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex offset-xs1 xs4 sm2>
          <v-card flat>
            <v-layout align-center>
              <img class="coin" :src="`/${tableData.moneda}.png`" alt="">
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex offset-xs1 offset-sm0 xs5 sm3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card flat>
                <v-card-title primary class="title no-padding">Estado</v-card-title>
                <v-card-text class="no-padding" v-text="state"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Mi Inversión</v-card-title>
                <v-card-text class="no-padding" v-text="`${data.inverted} ${tableData.moneda}`"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Monto</v-card-title>
                <v-card-text v-text="`${data.amount} ${tableData.moneda}`" class="no-padding"></v-card-text>
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
    </v-card>-->
    
  </section>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      block: null
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloque')
    this.$store.blocks.forEach((ele, index) => {
      if (ele.uuid === this.$router.history.current.params.block) { this.block = ele }
    })
  }
}
</script>
