<template>
  <section>
    <v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloque {{blocks[indexBlock].name}} </h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs5 sm3>
              <v-card flat>
                <v-layout align-center>
                  <img class="coin" :src="`/${blocks[indexBlock]._coin.name}.png`" alt="">
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex d-flex xs7 sm3>
              <v-layout row wrap>
                <v-flex d-flex>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Semanas</v-card-title>
                    <v-card-text class="no-padding" v-text="blocks[indexBlock].weeks"></v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Inversiones</v-card-title>
                    <v-card-text class="no-padding" v-text="`${blocks[indexBlock].amount - blocks[indexBlock].amountLeft} ${blocks[indexBlock]._coin.name}`"></v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Monto</v-card-title>
                    <v-card-text v-text="`${blocks[indexBlock].amount} ${blocks[indexBlock]._coin.name}`" class="no-padding"></v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex offset-sm2 xs5 sm4>
              <v-card flat>
                <v-card-title primary class="title no-padding ">Estado</v-card-title>
                <v-card-text class="no-padding blue--text" v-if="blocks[indexBlock].state === 'active'">activo</v-card-text>
                <v-card-text class="no-padding green--text" v-if="blocks[indexBlock].state === 'running'">En marcha</v-card-text>
                <v-card-text class="no-padding yellow--text" v-if="blocks[indexBlock].state === 'waiting'">En espera</v-card-text>
                <v-card-text class="no-padding red--text" v-if="blocks[indexBlock].state === 'paused'">pausado</v-card-text>
                <v-card-actions v-if="(blocks[indexBlock].state === 'running' || blocks[indexBlock].state === 'paused') && dayMax < blocks[indexBlock].runDays">
                  <v-btn block  color="primary mx-0" @click="dialogGain">Agregar ganancias</v-btn>
                </v-card-actions>
                <v-card-actions v-if="(blocks[indexBlock].state === 'running' || blocks[indexBlock].state === 'paused') && dayMax > 0">
                  <v-btn block  color="success mx-0" @click="dialogPay">Generación de pagos</v-btn>
                </v-card-actions>
              </v-card>
              <mutual-dialog :dialog="propsDialogGain" @close="closeDialogGain">
                <section slot="contenDialog">
                  <v-form 
                    v-model="valid" 
                    ref="formGain" 
                    lazy-validation>
                    <v-layout wrap>
                      <v-flex xs12 sm12>
                        <v-card-title primary class="title no-padding">Dia Numero: {{dayGain}}</v-card-title>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field type="Number" suffix="%" v-model="high" label="Alto" :rules="highRules" required :disabled="disableDays"/>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field type="Number" suffix="%" v-model="medium" label="Medio" :rules="mediumRules" required :disabled="disableDays"/>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field type="Number" suffix="%" v-model="low" label="Bajo" :rules="lowRules" required :disabled="disableDays"/>
                      </v-flex>
                    </v-layout>
                    <v-btn color="primary" @click="addGain" :disabled="!valid"> {{btnGain}} </v-btn>
                    <v-btn color="error" @click="cancelGain"  :disabled="disableDays"> Cancelar </v-btn>
                  </v-form>
                  <v-data-table :headers="gainHeader" :items="gainItems" class="elevation-1">
                    <template slot="items" scope="props">
                      <td class="text-xs-center">{{ props.item.day }}</td>
                      <td class="text-xs-center">{{ props.item.high }}</td>
                      <td class="text-xs-center">{{ props.item.medium }}</td>
                      <td class="text-xs-center">{{ props.item.low }}</td>
                      <td class="text-xs-center"><v-btn small color="warning" dark @click="editGain(props.item)">editar</v-btn></td>
                    </template>
                  </v-data-table>
                  <v-btn color="primary" :disabled="gainItems === null" @click="submitGain"> Guardar </v-btn>
                </section>
              </mutual-dialog>
              <mutual-dialog :dialog="propsDialogPay" @close="closeDialogPay">
                <section slot="contenDialog">
                  <v-form v-model="valid" ref="formPay" lazy-validation>
                    <v-layout wrap>
                      <v-flex xs6>
                        <v-select :items="itemsDay" v-model="selectDay" label="Hasta que dia" item-text="text" :rules="inputRules" single-line bottom >
                        </v-select>
                      </v-flex>
                      <v-flex xs6>
                        <v-btn block color="primary" @click="submitPayGenerated" :disabled="!valid">Generar pago</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>
                  <v-data-table :headers="payGeneratedHeader" :items="payGeneratedItems" class="elevation-1">
                    <template slot="items" scope="props">
                      <td class="text-xs-center">{{ props.item.nickname }}</td>
                      <td class="text-xs-center">{{ props.item.amount }}</td>
                      <td class="text-xs-center">{{ props.item.from }} - {{ props.item.to }}</td>
                      <td class="text-xs-center">{{ props.item.user }}</td>
                      <td class="text-xs-center">{{ props.item.red }}</td>
                      <td class="text-xs-center">{{ props.item.trader }}</td>
                      <td class="text-xs-center">{{ props.item.app }}</td>
                    </template>
                  </v-data-table>
                  <v-btn color="primary" :disabled="gainItems === null" @click="submitPay"> Pagar </v-btn>
                </section>
              </mutual-dialog>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text class="text-xs-center"><h4>Alto</h4></v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center"><h4>Medio</h4></v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center"><h4>Bajo</h4></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text class="text-xs-center">{{percentHigh}} %</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center">{{percentMedium}} %</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center">{{percentLow}} %</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text class="text-xs-center">{{highTotal}} - {{blocks[indexBlock]._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center">{{mediumTotal}} - {{blocks[indexBlock]._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center">{{lowTotal}} - {{blocks[indexBlock]._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-tabs v-model="active" class="elevation-9 mt-2">
          <v-tabs-bar class="blue" dark>
            <v-tabs-item v-for="tab in tabs" :key="tab" :href="'#' + tab" ripple>
              {{ tab }}
            </v-tabs-item>
            <v-tabs-slider color="yellow"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content :key="tabs[0]" :id="tabs[0]" >
              <v-layout row v-if="blocks[indexBlock].state === 'running' || blocks[indexBlock].state === 'paused'" class="ma-2">
                <v-flex xs12 v-if="blocks[indexBlock].state === 'running' || blocks[indexBlock].state === 'paused'">
                  <v-card class="elevation-9">
                    <v-data-table :headers="dayGainHeader" :items="blocks[indexBlock].daysInfo" >
                      <template slot="items" scope="props">
                        <td class="text-xs-center">{{ props.item.day }}</td>
                        <td class="text-xs-center">{{ props.item.high }}</td>
                        <td class="text-xs-center">{{ props.item.medium }}</td>
                        <td class="text-xs-center">{{ props.item.low }}</td>
                      </template>
                      <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                          aun no as ingresado ganancias :(
                        </v-alert>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-tabs-content>
          </v-tabs-items>
          <v-tabs-items>
            <v-tabs-content :key="tabs[1]" :id="tabs[1]" >
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Bloques Invertidos</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row>
            <v-flex xs12 class="no-padding my-2">
              <v-card class="elevation-9">
                <v-card-title>
                  Usuarios inversores
                </v-card-title>
                <v-data-table
                  :headers="userHeader"
                  :items="blocksUser">
                  <template 
                    slot="items"
                    scope="props">
                    <td>{{ props.item._user.nickname }}</td>
                    <td class="text-xs-right">{{ props.item.amount }}</td>
                    <td class="text-xs-right">{{ props.item.high }}%</td>
                    <td class="text-xs-right">{{ props.item.medium }}%</td>
                    <td class="text-xs-right">{{ props.item.low }}%</td>
                  </template>
                  <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                      Aun no se a invertido :(
                    </v-alert>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    
  </section>
</template>
<script>
import {mapState} from 'vuex'
import MutualDialog from '~/components/dialog.vue'
import swal from 'sweetalert2'
import api from '~/plugins/axios'
import decimal from 'decimal'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'blocks', 'coins', 'blocksUser'],
  data () {
    return {
      tabs: ['ganancias', 'pagos'],
      active: null,
      indexBlock: null,
      disableDays: false,
      selectDay: null,
      itemsDay: [],
      payGeneratedHeader: [
        {text: 'Usuario', value: 'nickname'},
        {text: 'Invertido', value: 'amount'},
        {text: 'Desde - hasta', value: 'to'},
        {text: 'Pago usuario', value: 'user'},
        {text: 'Pago estructura', value: 'red'},
        {text: 'Pago trader', value: 'trader'},
        {text: 'Pago aplicación', value: 'app'}
      ],
      payGeneratedItems: [],
      userHeader: [
        {text: 'Usuario', value: 'user'},
        {text: 'Inversión', value: 'amount'},
        {text: 'Alto', value: 'high'},
        {text: 'Medio', value: 'medium'},
        {text: 'Bajo', value: 'low'}
      ],
      dayGainHeader: [
        {text: 'Dia', value: 'day', sortable: false, align: 'center'},
        {text: 'alto', value: 'heigh', sortable: false, align: 'center'},
        {text: 'Medio', value: 'medioum', sortable: false, align: 'center'},
        {text: 'Bajo', value: 'low', sortable: false, align: 'center'}
      ],
      gainHeader: [
        {text: 'Dia', value: 'day', sortable: false, align: 'center'},
        {text: 'alto', value: 'heigh', sortable: false, align: 'center'},
        {text: 'Medio', value: 'medioum', sortable: false, align: 'center'},
        {text: 'Bajo', value: 'low', sortable: false, align: 'center'},
        {text: 'Opciones', sortable: false, align: 'center'}
      ],
      high: 0,
      medium: 0,
      low: 0,
      btnGain: 'Agregar',
      dayMax: 0,
      highTotal: 0,
      percentHigh: 0,
      mediumTotal: 0,
      percentMedium: 0,
      lowTotal: 0,
      percentLow: 0,
      dayGain: 1,
      lastDay: null,
      gainItems: [],
      userItems: [],
      propsDialogGain: {state: false, title: ''},
      propsDialogPay: {state: false, title: ''},
      valid: false,
      inputRules: [
        (v) => !!v || 'Campo requerido.'
      ],
      highRules: [
        (v) => !!v || 'valor es requerido'
      ],
      mediumRules: [
        (v) => !!v || 'valor es requerido'
      ],
      lowRules: [
        (v) => !!v || 'valor es requerido'
      ]
    }
  },
  components: {MutualDialog},
  computed: mapState(['blocks', 'coins', 'authToken', 'blocksUser']),
  methods: {
    dialogGain () {
      this.propsDialogGain = {state: true, title: 'Registro de ganancias'}
      this.dayMaximum()
      this.dayGain = this.dayMax
      if (this.dayGain === this.blocks[this.indexBlock].runDays) {
        this.disableDays = true
      } else {
        this.dayGain += 1
      }
    },
    addGain () {
      if (this.btnGain === 'Agregar') {
        this.gainItems.push({day: this.dayGain, high: this.high, medium: this.medium, low: this.low})
        if (this.dayGain === this.blocks[this.indexBlock].runDays) {
          this.disableDays = true
        } else {
          this.dayGain += 1
        }
      } else {
        let index = this.gainItems.findIndex(ele => ele.day === this.dayGain)
        this.gainItems.splice(index, 1, {day: this.dayGain, high: this.high, medium: this.medium, low: this.low})
        this.btnGain = 'Agregar'
        this.dayGain = this.lastDay
        this.high = 0
        this.medium = 0
        this.low = 0
      }
      this.$refs.formGain.reset()
    },
    cancelGain () {
      this.high = 0
      this.medium = 0
      this.low = 0
    },
    editGain (ele) {
      this.lastDay = this.dayGain
      this.dayGain = ele.day
      this.btnGain = 'Actualizar'
      this.high = ele.high
      this.medium = ele.medium
      this.low = ele.low
    },
    async submitGain () {
      if (this.gainItems.length > 0) {
        try {
          const data = {
            earnings: this.gainItems
          }
          const res = await api(`block/earnings/${this.$route.params.block}`, data, 'put', this.authToken)
          if (res.status === 200) {
            let newBlocks = this.blocks
            newBlocks[this.indexBlock].daysInfo = res.data.daysInfo
            this.$store.commit('SET_DAYSINFO', newBlocks)
            this.gainItems = []
            this.propsDialogGain = {state: false, title: ''}
          }
        } catch (error) {

        }
      } else {
        swal('Error...', 'No tienes ganancias agregadas', 'error')
      }
    },
    dialogPay () {
      this.propsDialogPay = {state: true, title: 'Realizar Pago'}
      this.dayMaximum()
      this.itemsDay = []
      for (let i = this.blocks; i < this.dayMax; i++) {
        this.itemsDay.push({text: `dia ${i + 1}`, day: i + 1})
      }
    },
    async submitPayGenerated () {
      const res = await api(`block/pay/${this.$route.params.block}/${this.selectDay.day}`, {}, 'put', this.authToken)
      if (res.status === 200) {
        console.log(res.data)
        this.payGeneratedItems = res.data
      }
    },
    async submitPay () {
      const res = await api(`block/makePay/${this.$route.params.block}`, {}, 'put', this.authToken)
      if (res.status === 200) {
        console.log(res.data)
      }
    },
    closeDialogGain () {
      this.gainItems = []
      this.$refs.formGain.reset()
      this.high = 0
      this.medium = 0
      this.low = 0
    },
    closeDialogPay () {
      console.log('close dialog pay')
    },
    dayMaximum () {
      this.blocks[this.indexBlock].daysInfo.forEach((ele) => {
        if (ele.day > this.dayMax) {
          this.dayMax = ele.day
        }
      })
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloque')
    this.indexBlock = this.blocks.findIndex(block => block.uuid === this.$route.params.block)
    this.blocksUser.forEach((ele) => {
      this.highTotal += decimal.mul(ele.amount.toString(), decimal.div(ele.high, 100)).toNumber()
      this.mediumTotal += decimal.mul(ele.amount.toString(), decimal.div(ele.medium, 100)).toNumber()
      this.lowTotal += decimal.mul(ele.amount.toString(), decimal.div(ele.low, 100)).toNumber()
    })
    let totalInve = this.highTotal + this.mediumTotal + this.lowTotal
    this.percentHigh = decimal.div(decimal.mul(this.highTotal.toString(), 100), totalInve.toString()).toNumber()
    this.percentMedium = decimal.div(decimal.mul(this.mediumTotal.toString(), 100), totalInve.toString()).toNumber()
    this.percentLow = decimal.div(decimal.mul(this.lowTotal.toString(), 100), totalInve.toString()).toNumber()
    this.dayMaximum()
  }
}
</script>
<style scoped>
.wp {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}
img{
  box-sizing: border-box;
  max-width: 80%;
  width: 100px;
  margin: 20px
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

