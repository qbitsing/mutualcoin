<template>
  <v-layout column>
    <v-card>
      <v-card-title>
        <v-layout row wrap align-center>
        <v-flex d-flex offset-xs1 xs5 sm2>
          <v-card flat>
            <v-layout align-center>
              <img class="coin" :src="`/${inversion._block._coin.name}.png`" alt="">
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex offset-xs1 offset-sm0 xs5 sm3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card flat>
                <v-card-title primary class="title no-padding">Estado</v-card-title>
                <v-card-text class="no-padding blue--text" v-if="inversion._block.state === 'active'">Activo</v-card-text>
                <v-card-text class="no-padding green--text" v-if="inversion._block.state === 'running'">En marcha</v-card-text>
                <v-card-text class="no-padding yellow--text" v-if="inversion._block.state === 'waiting'">En espera</v-card-text>
                <v-card-text class="no-padding red--text" v-if="inversion._block.state === 'paused'">Pausado</v-card-text>
                <v-card-text class="no-padding red--text" v-if="inversion._block.state === 'cancel'">Cancelado</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Mi Inversión</v-card-title>
                <v-card-text class="no-padding" v-text="`${inversion.amount} ${inversion._block._coin.name}`"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Monto</v-card-title>
                <v-card-text v-text="`${inversion._block.amount} ${inversion._block._coin.name}`" class="no-padding"></v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex offset-xs1 offset-sm0 xs10 sm5>
        <v-layout row text-xs-center headline>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text>Alto</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text>Medio</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text>Bajo</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row text-xs-center>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text>{{inversion.high}} %</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text>{{inversion.medium}} %</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text>{{inversion.low}} %</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row text-xs-center>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text>{{inversion.high * inversion.amount / 100}} {{inversion._block._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text>{{inversion.medium * inversion.amount / 100}} {{inversion._block._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text>{{inversion.low * inversion.amount / 100}} {{inversion._block._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        </v-flex>
        </v-layout>
      </v-card-title>
        <mutual-timeline :data="inversion._block"></mutual-timeline>
        <v-container grid-list-md text-xs-center>
          <v-layout row>
            <v-flex xs12 offset-md1 md10>
              <div class="wp">
                <v-btn
                v-for="n in inversion._block.weeks"
                :flat="week == n"
                :key="n"
                class="wel"
                @click="week = n"
                :color="'primary'"
                :disabled="n > weeks.length">
                  {{n}}
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 offset-md1 md10>
              <v-data-table
                v-if="weeks.length"
                :headers="headers"
                hide-actions
                :items="weeks[week-1]"
                class="elevation-1"
              >
                <template slot="items" scope="props">
                  <td>{{ props.item.day }}</td>
                  <td class="text-xs-center">{{ props.item.high}}</td>
                  <td class="text-xs-center">{{ props.item.highCoin || 0}}</td>
                  <td class="text-xs-center">{{ props.item.medium }}</td>
                  <td class="text-xs-center">{{ props.item.mediumCoin || 0}}</td>
                  <td class="text-xs-center">{{ props.item.low }}</td>
                  <td class="text-xs-center">{{ props.item.lowCoin || 0}}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
          <v-layout row v-show="this.inversion.pays.some(e => e.week === week)">
            <v-flex xs12 offset-md1 md10>
              <h2>Pagos</h2>
              <v-data-table
                v-if="weeks.length"
                :headers="payHeaders"
                hide-actions
                :items="payItems"
                class="elevation-1"
              >
                <template slot="items" scope="props">
                  <td class="text-xs-center">{{ props.item.from }} - {{ props.item.to }}</td>
                  <td class="text-xs-center">{{ props.item.user }}</td>
                  <td class="text-xs-center">Awesome Date</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
    </v-card>
  </v-layout>
</template>
<script>
// import decimal from 'decimal'
import BigNumber from 'bignumber.js'
import MutualTimeline from '~/components/timeline.vue'
import MutualTable from '~/components/table.vue'
import {mapState} from 'vuex'
export default {
  middleware: ['auth', 'userInversions', 'setInversion'],
  layout: 'dashboard',
  computed: {
    ...mapState(['inversion']),
    payItems () {
      return this.inversion.pays.filter(e => e.week === this.week)
    },
    headers () {
      return [
        { text: 'Día', value: 'day', align: 'center' },
        { text: 'Alto %', value: 'high', align: 'center' },
        { text: `Alto ${this.inversion._block._coin.acronym.toUpperCase()}`, value: 'highCoin', align: 'center' },
        { text: 'Medio %', value: 'medium', align: 'center' },
        { text: `Medio ${this.inversion._block._coin.acronym.toUpperCase()}`, value: 'mediumCoin', align: 'center' },
        { text: 'Bajo %', value: 'low', align: 'center' },
        { text: `Bajo ${this.inversion._block._coin.acronym.toUpperCase()}`, value: 'lowCoin', align: 'center' }
      ]
    },
    payHeaders () {
      return [
        {text: 'Rango de días', value: 'to', align: 'center'},
        {text: `Valor en `, value: 'user', align: 'center'},
        {text: 'Fecha', value: 'date', align: 'center'}
      ]
    }
  },
  data () {
    return {
      percentToUser: 0.4,
      weeks: [],
      week: 1
    }
  },
  methods: {
    calcular (exp) {
      return parseFloat(exp.toFixed(8))
    },
    dividirArray (arr) {
      let result = []
      for (let index = 1; index <= Math.ceil(arr.length / 7); index++) {
        let start = (index * 7) - 7
        let finish = index * 7
        let week = []
        if (arr.length < finish) {
          for (let i = start; i < arr.length; i++) {
            week.push(arr[i])
          }
        } else {
          for (let i = start; i <= finish - 1; i++) {
            week.push(arr[i])
          }
        }
        result.push(week)
      }
      return result
    },
    calcEarnings (percent, pay) {
      let amount = new BigNumber(this.inversion.amount)
      return amount.times(percent).dividedBy(10000).times(pay).times(this.inversion.percentToUser).toString()
    },
    formatearArray (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let i2 = 0; i2 < arr[i].length; i2++) {
          // let negativeHigh = arr[i][i2].high < 0
          // let negativeMedium = arr[i][i2].medium < 0
          // let negativeLow = arr[i][i2].low < 0
          // let payHigh = negativeHigh ? arr[i][i2].high * -1 : arr[i][i2].high
          // let payMedium = negativeMedium ? arr[i][i2].medium * -1 : arr[i][i2].medium
          // let payLow = negativeLow ? arr[i][i2].low * -1 : arr[i][i2].low

          // payHigh = decimal.mul(this.inversion.amount, this.inversion.high).div(10000).mul(payHigh).mul(this.percentToUser).toNumber()
          // payMedium = decimal.mul(this.inversion.amount, this.inversion.medium).div(10000).mul(payMedium).mul(this.percentToUser).toNumber()
          // payLow = decimal.mul(this.inversion.amount, this.inversion.low).div(10000).mul(payLow).mul(this.percentToUser).toNumber()

          // arr[i][i2].highCoin = negativeHigh ? payHigh * -1 : payHigh
          // arr[i][i2].mediumCoin = negativeMedium ? payMedium * -1 : payMedium
          // arr[i][i2].lowCoin = negativeLow ? payLow * -1 : payLow
          // let payHigh = new BigNumber(arr[i][i2].high)

          arr[i][i2].highCoin = this.calcEarnings(this.inversion.high, arr[i][i2].highCoin)
          arr[i][i2].mediumCoin = this.calcEarnings(this.inversion.medium, arr[i][i2].mediumCoin)
          arr[i][i2].lowCoin = this.calcEarnings(this.inversion.low, arr[i][i2].lowCoin)
          // console.log(arr[i][i2].highCoin.toJSON())
        }
      }
      return arr
    }
  },
  components: { MutualTimeline, MutualTable },
  created () {
    BigNumber.config({EXPONENTIAL_AT: [-20, 20]})
    this.$store.commit('TITLE_VIEW', 'Línea del tiempo')
    const weeks = this.dividirArray(this.inversion._block.daysInfo)
    this.weeks = this.formatearArray(weeks)
    this.week = this.weeks.length
    this.inversion.pays.forEach(e => {
      e.week = Math.ceil(e.to / 7)
    })
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
