<template>
  <section>
    <mutual-loader v-show="loading"></mutual-loader>
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
                item-text="name"
                :rules="inputRules"
                single-line
                bottom
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                type="Number"
                min="1"
                label="Monto"
                :rules="numberRules"
                v-model="amount"
                @keypress="preventLetters"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                type="Number"
                min="1"
                label="Semanas"
                :rules="numberRules"
                v-model="weeks"
                @keypress="preventLetters"
                >
                </v-text-field>
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
                      :hint="'Nombre del Usuario'"
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
        <v-card>
          <v-card-title>
          <v-text-field
            append-icon="search"
            single-line
            label="Búsqueda"
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
          <v-data-table
            :headers="blockHeader"
            :search="search"
            :items="allBlocks"
            class="elevation-1">
            <template
              slot="items"
              scope="props">
              <td class="text-xs-center">{{ props.item.name}}</td>
              <td class="text-xs-center">{{ props.item._coin.name }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
              <td class="text-xs-center">{{ props.item.inverted}}</td>
              <td class="text-xs-center">{{ props.item.weeks }}</td>
              <td class="text-xs-center">{{ props.item.spanishState }}</td>
              <td class="text-xs-center">
                <v-btn small color="primary" @click="changeState(props.item, 'Activate', 'active', 'activar', 'activado')" v-if="props.item.state == 'inactive'">activar</v-btn>
                <v-btn small color="primary" @click="changeState(props.item, 'Waiting', 'waiting', 'cerrar', 'cerrado')" v-if="props.item.state == 'active'">cerrar</v-btn>
                <v-btn small color="primary" @click="changeState(props.item, 'Run', 'running', 'iniciar', 'corriendo')" v-if="props.item.state == 'waiting'">iniciar</v-btn>
                <v-btn small color="primary" @click="changeAmount" v-if="props.item.state == 'inactive' || props.item.state == 'active'">cambiar monto</v-btn>
                <v-btn small color="primary" @click="changeState(props.item, 'Run', 'running', 'reanudar', 'corriendo')" v-if="props.item.state == 'paused'">reanudar</v-btn>
                <v-btn small color="warning" @click="changeState(props.item, 'Pause', 'paused', 'pausar', 'pausado')" v-if="props.item.state == 'running'">pausar</v-btn>
                <v-btn small color="error" @click="changeState(props.item, 'Cancel', 'cancel', 'cancelar', 'cancelado')" v-if="props.item.state != 'finished' && props.item.state != 'cancel'">cancelar</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
    </v-card>
  </section>
</template>
<script>

import api from '~/plugins/axios'
import MutualLoader from '~/components/loader.vue'
import swal from 'sweetalert2'
import create from '~/plugins/mutations/blockAdd'
import mutation from '~/plugins/mutations/changeState'
import {mapState} from 'vuex'
import moment from 'moment'
import BigNumber from 'bignumber.js'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'blocks', 'coins'],
  components: {MutualLoader},
  data () {
    return {
      allBlocks: [],
      valid: false,
      loading: false,
      coin: null,
      weeks: null,
      amount: null,
      search: '',
      user: null,
      userCheck: false,
      blockHeader: [
        {text: 'Identificador', align: 'center', value: 'name'},
        {text: 'Moneda', align: 'center', value: '_coin.name'},
        {text: 'Monto', align: 'center', value: 'amount'},
        {text: 'Invertidos', align: 'center', value: 'inverted'},
        {text: 'Semanas', align: 'center', value: 'weeks'},
        {text: 'Estado', align: 'center', value: 'state'},
        {text: 'Acciones', align: 'center', value: 'state'}
      ],
      inputRules: [
        (v) => !!v || 'Campo requerido.'
      ],
      numberRules: [
        (v) => !!v || 'Campo requerido.',
        (v) => v > 0 || 'Debe ser mayor a cero.'
      ]
    }
  },
  computed: mapState(['coins', 'authToken', 'blocks']),
  methods: {
    changeAmount () {
      swal('Cambiar monto', 'Ingrese el nuevo monto del bloque', 'warning')
    },
    async submit () {
      if (this.$refs.activarBloque.validate()) {
        this.loading = true
        let res
        const data = {
          coin: this.coin.uuid,
          amount: parseInt(this.amount),
          weeks: parseInt(this.weeks)
        }
        console.log(data)
        console.log(create(data))
        if (this.userCheck) {
          data.user = this.user
        }
        try {
          res = await api(create(data), 'post', this.authToken)
        } catch (error) {
          swal('Ooops...', 'Error al crear el bloque, intentálo más tarde', 'error')
        }
        console.log(res)
        if (res.data.data.result) {
          let block = res.data.data.result
          block.spanishState = this.spanishText(block.state)
          block.inverted = 0
          this.allBlocks.unshift(block)
          this.blocks.inactive.unshift(block)
          this.clear()
          swal('Excelente', 'Bloque creado correctamente', 'success')
        } else {
          swal('Ooops...', 'Error al crear bloque', 'error')
        }
        this.loading = false
      }
    },
    preventLetters (ev) {
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        ev.preventDefault()
      }
    },
    clear () {
      this.$refs.activarBloque.reset()
    },
    async changeState (item, to, newState, text1, text2) {
      swal({
        title: 'Cuidado',
        text: `¿Está seguro de que desea ${text1} el bloque?`,
        input: 'password',
        inputPlaceholder: 'Ingrese su contraseña',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {
          return !value && 'Escribe la contraseña'
        },
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          moment.locale('es')
          let data = {uuid: item.uuid, to}
          if (text1 === 'iniciar') {
            data.startDate = moment().format('DD/MM/YY')
          }
          let res
          try {
            res = await api(mutation(data), 'post', this.authToken)
          } catch (e) {
            console.error(e.message)
            console.error(e.stack)
            swal('Ooops...', 'Network error', 'error')
          }
          if (res.data.data.result === 200) {
            // let objBlocks = this.blocks
            this.blocks[item.state] = this.blocks[item.state].filter(e => {
              if (e.uuid === item.uuid) return false
              else return true
            })
            item.state = newState
            if (data.startDate) {
              item.startDate = data.startDate
            }
            const waitingAmount = item.inverted
            item.amount = newState === 'waiting' ? waitingAmount : item.amount
            this.blocks[item.state].unshift(item)
            item.spanishState = this.spanishText(newState)
            this.$store.commit('SET_BLOCKS', this.blocks)
            return swal('Excelente', `Bloque ${text2} con éxito.`, 'success')
          } else return swal('Ooops...', `Error al ${text1} el bloque.`, 'error')
        }
      })
    },
    spanishText (text) {
      if (text === 'running') return 'En Marcha'
      if (text === 'inactive') return 'Inactivo'
      else if (text === 'active') return 'Activo'
      else if (text === 'cancel') return 'Cancelado'
      else if (text === 'paused') return 'Pausado'
      else if (text === 'waiting') return 'En espera'
      else if (text === 'finished') return 'Finalizado'
      else return text
    },
    formatBlocks () {
      this.allBlocks.map(e => {
        if (!e.spanishState) {
          let amount = new BigNumber('' + e.amount)
          e.spanishState = this.spanishText(e.state)
          e.inverted = amount.minus('' + e.amountLeft).toString()
        }
        return e
      })
    }
  },
  created () {
    BigNumber.config({EXPONENTIAL_AT: [-20, 20]})
    for (const key in this.blocks) {
      this.allBlocks = this.allBlocks.concat(this.blocks[key])
    }
    this.formatBlocks()
    this.$store.commit('TITLE_VIEW', 'Gestion de Bloques')
  }
}
</script>
<style scoped>
  .user-layout{
    height: 100%;
  }
  .user-check .input-group__details{
    display: none !important;
  }
  .no-padding-top{
    padding-top: 0;
  }
</style>
