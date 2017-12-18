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
                <v-text-field
                name="input-10-1"
                label="Monto"
                v-model="amount"
                ></v-text-field>
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
              <v-flex xs12 sm6>
                <v-layout align-center class="user-layout">
                  <v-flex xs3 sm5 md3>
                    <v-checkbox
                      class="user-check"
                      label="Usuario"
                      v-model="userCheck"
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs9 sm7 md9>
                    <v-text-field
                      v-show="userCheck"
                      name="user"
                      label="Código del usuario"
                      v-model="amount"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="no-padding-top">
        <v-container text-xs-center text-sm-left class="no-padding-top">
          <v-btn large color="primary">Registrar</v-btn>
          <v-btn large color="error">Cancelar</v-btn>
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
      amount: null,
      userCheck: false,
      coins: [],
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
    const token = this.$store.state.authToken
    const res = await api('coin/all', {}, 'get', token)
    for (let coin of res.data.coins) {
      this.coins.push({
        text: coin.name
      })
    }
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
  .user-layout{
    height: 100%;
  }
  .user-check .input-group__details{
    display: none;
  }
  .no-padding-top{
    padding-top: 0;
  }
</style>
