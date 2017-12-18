<template>
  <section>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Registro de Bloque</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-form>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                name="input-10-1"
                label="Monto"
                v-model="amount"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                :items="coins"
                v-model="coin"
                label="Moneda"
                single-line
                bottom
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                :items="weeks"
                v-model="week"
                label="Semanas de duración"
                single-line
                bottom
                >
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="no-padding-top">
        <v-container text-xs-center text-sm-left class="no-padding-top">
          <v-btn large primary>Registrar</v-btn>
          <v-btn large error>Cancelar</v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </section>
</template>
<script>
import api from '~/plugins/axios'
export default {
  layout: 'dashboard',
  data () {
    return {
      coin: null,
      week: null,
      coins: [
        { text: 'Bitcoin' },
        { text: 'Ethereum' }
      ],
      weeks: [
        { text: '4' },
        { text: '8' },
        { text: '12' },
        { text: '16' },
        { text: '20' },
        { text: '24' }
      ]
    }
  },
  async created () {
    const res = await api('block/all', {}, 'get')
    console.log(res)
  },
  beforeMount () {
    this.$store.commit('TITLE_VIEW', 'Gestion de Bloques')
  }
}
</script>
<style>
  .mutual-title {
    color: #fff;
    background: #2A77FF;
  }
  .no-padding-top{
    padding-top: 0;
  }
</style>
