<template>
  <section>
    <v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloque {{blocks[state][indexBlock].name}} </h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs5 sm3>
              <v-card flat>
                <v-layout align-center>
                  <img class="coin" :src="`/${blocks[state][indexBlock]._coin.name}.png`" alt="">
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex d-flex xs7 sm3>
              <v-layout row wrap>
                <v-flex d-flex>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Semanas</v-card-title>
                    <v-card-text class="no-padding" v-text="blocks[state][indexBlock].weeks"></v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Inversiones</v-card-title>
                    <v-card-text class="no-padding" v-text="`${blocks[state][indexBlock].amount - blocks[state][indexBlock].amountLeft} ${blocks[state][indexBlock]._coin.name}`"></v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Monto</v-card-title>
                    <v-card-text v-text="`${blocks[state][indexBlock].amount} ${blocks[state][indexBlock]._coin.name}`" class="no-padding"></v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex offset-sm2 xs5 sm4>
              <v-card flat>
                <v-card-title primary class="title no-padding ">Estado</v-card-title>
                <v-card-text class="no-padding blue--text" v-if="blocks[state][indexBlock].state === 'active'">activo</v-card-text>
                <v-card-text class="no-padding green--text" v-if="blocks[state][indexBlock].state === 'running'">En marcha</v-card-text>
                <v-card-text class="no-padding yellow--text" v-if="blocks[state][indexBlock].state === 'waiting'">En espera</v-card-text>
                <v-card-text class="no-padding red--text" v-if="blocks[state][indexBlock].state === 'paused'">pausado</v-card-text>
                <v-card-actions v-if="(blocks[state][indexBlock].state === 'running' || blocks[state][indexBlock].state === 'paused') && dayMax < blocks[state][indexBlock].runDays">
                  <v-btn block  color="primary mx-0" @click="dialogGain">Agregar ganancias</v-btn>
                </v-card-actions>
                <v-card-actions v-if="(blocks[state][indexBlock].state === 'running' || blocks[state][indexBlock].state === 'paused') && dayMax > 0 && blocks[state][indexBlock].last_pay < dayMax">
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
                  <v-layout row>
                    <v-flex xs12>
                      <v-card class="elevation-9">
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
                      </v-card>
                    </v-flex>
                  </v-layout>
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
                <v-card-text class="text-xs-center">{{highTotal}} - {{blocks[state][indexBlock]._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center">{{mediumTotal}} - {{blocks[state][indexBlock]._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center">{{lowTotal}} - {{blocks[state][indexBlock]._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-tabs v-model="active" v-if="blocks[state][indexBlock].state === 'running' || blocks[state][indexBlock].state === 'paused'" class="elevation-9 mt-2">
          <v-tabs-bar class="blue" dark>
            <v-tabs-item v-for="tab in tabs" :key="tab" :href="'#' + tab" ripple>
              {{ tab }}
            </v-tabs-item>
            <v-tabs-slider color="yellow"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content :key="tabs[0]" :id="tabs[0]" >
              <v-layout row class="ma-2">
                <v-flex xs12>
                  <v-card class="elevation-9">
                    <v-data-table :headers="dayGainHeader" :items="blocks[state][indexBlock].daysInfo" >
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
              <v-layout row class="ma-2">
                <v-flex xs12>
                  <v-card class="elevation-9">
                    <v-data-table :headers="payHeader" :items="payItems" >
                      <template slot="items" scope="props">
                        <td class="text-xs-center">{{ props.item.nickname }}</td>
                        <td class="text-xs-center">{{ props.item.amount }}</td>
                        <td class="text-xs-center">{{ props.item.from }} - {{ props.item.to }}</td>
                        <td class="text-xs-center">{{ props.item.user }}</td>
                        <td class="text-xs-center">{{ props.item.red }}</td>
                        <td class="text-xs-center">{{ props.item.trader }}</td>
                        <td class="text-xs-center">{{ props.item.app }}</td>
                      </template>
                      <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                          aun no as realizado pagos :(
                        </v-alert>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-flex>
              </v-layout>
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
import mutationEarnings from '~/plugins/mutations/submitGain'
import swal from 'sweetalert2'
import api from '~/plugins/axios'
import BigNumber from 'bignumber.js'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'coins', 'blocks', 'blocksUser'],
  data () {
    return {
      tabs: ['ganancias', 'pagos'],
      active: null,
      indexBlock: null,
      state: null,
      disableDays: false,
      selectDay: null,
      itemsDay: [],
      payHeader: [
        {text: 'Usuario', value: 'nickname'},
        {text: 'Invertido', value: 'amount'},
        {text: 'Desde - hasta', value: 'to'},
        {text: 'Pago usuario', value: 'user'},
        {text: 'Pago estructura', value: 'red'},
        {text: 'Pago trader', value: 'trader'},
        {text: 'Pago aplicación', value: 'app'}
      ],
      payItems: [],
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
      if (this.dayGain === this.blocks[this.state][this.indexBlock].runDays) {
        this.disableDays = true
      } else {
        this.dayGain += 1
      }
    },
    addGain () {
      if (this.btnGain === 'Agregar') {
        this.gainItems.push({day: this.dayGain, high: this.high, medium: this.medium, low: this.low})
        if (this.dayGain === this.blocks[this.state][this.indexBlock].runDays) {
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
          swal({
            title: 'Cuidado',
            text: `¿Está seguro de que desea guardar estas ganancias?`,
            input: 'password',
            inputPlaceholder: 'Ingrese su contraseña',
            showCancelButton: true,
            allowOutsideClick: false,
            type: 'question',
            inputValidator: (value) => {
              return !value && 'Escribe la contraseña'
            },
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              const res = await api(mutationEarnings(this.$route.params.block, this.gainItems), 'post', this.authToken)
              if (res.status === 200) {
                let newBlocks = this.blocks
                newBlocks[this.state][this.indexBlock].daysInfo = res.data.daysInfo
                this.$store.commit('SET_DAYSINFO', newBlocks)
                this.gainItems = []
                this.propsDialogGain = {state: false, title: ''}
                this.dayMaximum()
                return swal('Excelente', `Ganancias almacenas con éxito.`, 'success')
              } else return swal('Ooops...', `Error las ganacias no se alamcenaron.`, 'error')
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        swal('Error...', 'No tienes ganancias agregadas', 'error')
      }
    },
    dialogPay () {
      this.propsDialogPay = {state: true, title: 'Realizar Pago'}
      this.dayMaximum()
      this.itemsDay = []
      for (let i = this.blocks[this.state][this.indexBlock].last_pay; i < this.dayMax; i++) {
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
      try {
        swal({
          title: 'Cuidado',
          text: `¿Está seguro de que desea pagar estas ganancias?`,
          input: 'password',
          inputPlaceholder: 'Ingrese su contraseña',
          showCancelButton: true,
          allowOutsideClick: false,
          type: 'question',
          inputValidator: (value) => {
            return !value && 'Escribe la contraseña'
          },
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            const res = await api(`block/makePay/${this.$route.params.block}`, {}, 'put', this.authToken)
            if (res.status === 200) {
              let newBlocks = this.blocks
              newBlocks[this.indexBlock].last_pay = this.payGeneratedItems[0].to
              this.$store.commit('SET_BLOCK', newBlocks)
              this.payGeneratedItems = []
              this.$store.commit('SET_BLOCKSUSER', res.data.investments)
              this.addItemsPay()
              this.propsDialogPay = {state: false, title: ''}
              return swal('Excelente', `Pago realizado con exito.`, 'success')
            } else return swal('Ooops...', `Error las ganacias no se pagaron.`, 'error')
          }
        })
      } catch (error) {
        console.log(error)
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
      this.blocks[this.state][this.indexBlock].daysInfo.forEach((ele) => {
        if (ele.day > this.dayMax) {
          this.dayMax = ele.day
        }
      })
    },
    addItemsPay () {
      this.payItems = []
      this.blocksUser.map((ele) => {
        ele.pays.map((ele) => {
          this.payItems.push(ele)
        })
      })
    },
    decimal (result) {
      return parseFloat(result.toFixed(8))
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloque')

    for (var prop in this.blocks) {
      this.indexBlock = this.blocks[prop].findIndex(block => block.uuid === this.$route.params.block)
      if (this.indexBlock !== -1) {
        this.state = prop
        break
      }
    }
    console.log(this.indexBlock)
    this.blocksUser.forEach((ele) => {
      let high = new BigNumber(ele.high)
      let medium = new BigNumber(ele.medium)
      let low = new BigNumber(ele.low)
      this.highTotal = high.dividedBy('100').times(ele.amount.toString()).plus(this.highTotal.toString()).toNumber()
      this.mediumTotal = medium.dividedBy('100').times(ele.amount.toString()).plus(this.mediumTotal.toString()).toNumber()
      this.lowTotal = low.dividedBy('100').times(ele.amount.toString()).plus(this.lowTotal.toString()).toNumber()
    })
    let highTotal = new BigNumber(this.highTotal)
    let mediumTotal = new BigNumber(this.mediumTotal)
    let lowTotal = new BigNumber(this.lowTotal)
    let totalInve = highTotal.plus(mediumTotal.toString()).plus(lowTotal.toString()).toNumber()

    this.percentHigh = highTotal.dividedBy(totalInve.toString()).times('100').toNumber()
    this.percentMedium = mediumTotal.dividedBy(totalInve.toString()).times('100').toNumber()
    this.percentLow = lowTotal.dividedBy(totalInve.toString()).times('100').toNumber()
    this.dayMaximum()
    this.addItemsPay()
  }
}
</script>
<style scoped>
table {
  overflow-y: scroll !important;
}
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

