<template>
  <section>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Registro de Bloque</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-form v-model="valid" ref="activarBloque">
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-select
                :items="coins"
                v-model="coin"
                label="Moneda"
                :rules="inputRules"
                single-line
                bottom
                required
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                type="Number"
                min="0"
                label="Monto"
                :rules="inputRules"
                v-model="amount"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                :items="weeks"
                v-model="week"
                :rules="inputRules"
                label="Semanas de duración"
                single-line
                required
                bottom
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-layout align-center class="user-layout">
                  <v-flex xs3 sm5 md3>
                    <v-checkbox
                      color="primary"
                      class="user-check"
                      label="Usuario"
                      v-model="userCheck"
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs9 sm7 md9>
                    <v-text-field
                      v-show="userCheck"
                      name="user"
                      :rules="userCheck ? inputRules : []"

                      label="Código del usuario"
                      v-model="user"
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
          <v-btn large @click="submit" color="primary">Registrar</v-btn>
          <v-btn large @click="clear" color="error">Cancelar</v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-card class="mt-3">
      <v-card-title class="mutual-title">
        <h2>Todos los Bloques</h2>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="blockHeader"
          :items="blocks"
          class="elevation-1">
          <template
            slot="items"
            scope="props">
            <td class="text-xs-center">{{ props.item.coin }}</td>
            <td class="text-xs-center">{{ props.item.amount }}</td>
            <td class="text-xs-center">{{ props.item.weeks }}</td>
            <td class="text-xs-center">{{ props.item.state }}</td>
            <td class="text-xs-right">
              <v-btn small color="primary" dark @click="activar(props.item)" v-if="props.item.state == 'inactive'">activar</v-btn>
              <v-btn small color="primary" dark @click="iniciar(props.item)" v-if="props.item.state == 'active'">iniciar</v-btn>
              <v-btn small color="primary" dark @click="reanudar(props.item)" v-if="props.item.state == 'waiting'">reanudar</v-btn>
              <v-btn small color="warning" dark @click="pausar(props.item)" v-if="props.item.state == 'running'">pausar</v-btn>
              <v-btn small color="error" dark @click="cancelar(props.item)" v-if="props.item.state != 'finished'">cancelar</v-btn>
              <v-btn small color="secondary" dark @click="info(props.item)" v-if="props.item.state != 'finished'">info</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>
<script>
import api from '~/plugins/axios'
import swal from 'sweetalert2'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      valid: false,
      coin: null,
      week: null,
      amount: null,
      user: null,
      userCheck: false,
      coins: [],
      blockHeader: [
        {text: 'Moneda', align: 'center', value: 'coin'},
        {text: 'Monto', align: 'center', value: 'amount'},
        {text: 'Semanas', align: 'center', value: 'weeks'},
        {text: 'Estado', align: 'center', value: 'state'},
        {text: 'Acciones', align: 'center', value: 'state'}
      ],
      blocks: [],
      inputRules: [
        (v) => !!v || 'Campo requerido'
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
  methods: {
    async submit () {
      if (this.$refs.activarBloque.validate()) {
        const self = this
        const data = {
          blockToCreate: {
            coin: self.coin.id,
            amount: parseInt(self.amount),
            weeks: parseInt(self.week.text)
          }
        }
        if (this.userCheck) {
          data.user = this.user
        }
        const token = this.$store.state.authToken
        const res = await api('block/create', data, 'post', token)
        if (res.status === 200) {
          this.blocks.push(res.data.blockCreated)
          swal('Excelente', 'Bloque creado correctamente', 'success')
        } else {
          swal('Ooops...', 'Error al crear el bloque', 'error')
        }
        console.log(res)
      }
    },
    clear () {
      this.$refs.activarBloque.reset()
    }
  },
  created () {
    const token = this.$store.state.authToken
    const self = this
    async function getCoins () {
      const res = await api('coin/all', {}, 'get', token)
      for (let coin of res.data.coins) {
        self.coins.push({
          text: coin.name,
          id: coin.uuid
        })
      }
    }
    async function getBlocks () {
      const res = await api('block/all', {}, 'get', token)
      self.blocks = res.data.blocks
    }
    getBlocks()
    getCoins()
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
