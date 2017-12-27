<template>
  <v-layout column>
    <v-card>
      <v-card-title>
        <v-layout row wrap align-center>
        <v-flex d-flex offset-xs1 xs5 sm2>
          <v-card flat>
            <v-layout align-center>
              <img class="coin" :src="`/${inversion.objBlock._coin.name}.png`" alt="">
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex offset-xs1 offset-sm0 xs5 sm3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card flat>
                <v-card-title primary class="title no-padding">Estado</v-card-title>
                <v-card-text class="no-padding blue--text" v-if="inversion.objBlock.state === 'active'">Activo</v-card-text>
                <v-card-text class="no-padding green--text" v-if="inversion.objBlock.state === 'running'">En marcha</v-card-text>
                <v-card-text class="no-padding yellow--text" v-if="inversion.objBlock.state === 'waiting'">En espera</v-card-text>
                <v-card-text class="no-padding red--text" v-if="inversion.objBlock.state === 'paused'">Pausado</v-card-text>
                <v-card-text class="no-padding red--text" v-if="inversion.objBlock.state === 'cancel'">Cancelado</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Mi Inversión</v-card-title>
                <v-card-text class="no-padding" v-text="`${inversion.amount} ${inversion.objBlock._coin.name}`"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card flat>
                <v-card-title primary class="title no-padding">Monto</v-card-title>
                <v-card-text v-text="`${inversion.objBlock.amount} ${inversion.objBlock._coin.name}`" class="no-padding"></v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex offset-xs1 offset-sm0 xs10 sm5>
        <v-layout row>
          <v-flex xs12 class="no-padding">
            <v-card dark tile flat color="blue-grey darken-3">
              <v-card-text><h4>Porcentajes Invertidos</h4></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
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
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text>{{inversion.high}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text>{{inversion.medium}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text>{{inversion.low}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        </v-flex>
        </v-layout>
      </v-card-title>
        <mutual-timeline :data="inversion.objBlock"></mutual-timeline>
        <v-container grid-list-md text-xs-center>
          <v-layout row>
            <v-flex xs12 offset-md1 md10>
              <div class="wp">
                <v-btn
                v-for="n in inversion.objBlock.weeks"
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
                  <td class="text-xs-right">{{ props.item.high}}</td>
                  <td class="text-xs-right">{{ props.item.highCoin }}</td>
                  <td class="text-xs-right">{{ props.item.medium }}</td>
                  <td class="text-xs-right">{{ props.item.mediumCoin }}</td>
                  <td class="text-xs-right">{{ props.item.low }}</td>
                  <td class="text-xs-right">{{ props.item.lowCoin }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
    </v-card>
  </v-layout>
</template>
<script>
import decimal from 'decimal'
import MutualTimeline from '~/components/timeline.vue'
import MutualTable from '~/components/table.vue'
import {mapState} from 'vuex'
export default {
  middleware: ['auth', 'isInversion'],
  layout: 'dashboard',
  computed: mapState(['inversion']),
  data () {
    return {
      weeks: [],
      week: 1,
      headers: [
        { text: 'Día', value: 'day' },
        { text: 'Alto%', value: 'high' },
        { text: `Alto Coins`, value: 'highCoin' },
        { text: 'Medio%', value: 'medium' },
        { text: `Medio Coins`, value: 'mediumCoin' },
        { text: 'Bajo%', value: 'low' },
        { text: `Bajo Coins`, value: 'lowCoin' }
      ]
    }
  },
  methods: {
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
    formatearArray (arr) {
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        for (let i2 = 0; i2 < arr[i].length; i2++) {
          arr[i][i2].highCoin = decimal.mul(this.inversion.amount, this.inversion.high).div(10000).mul(arr[i][i2].high).toNumber()
          arr[i][i2].mediumCoin = decimal.mul(this.inversion.amount, this.inversion.medium).div(10000).mul(arr[i][i2].medium).toNumber()
          arr[i][i2].lowCoin = decimal.mul(this.inversion.amount, this.inversion.low).div(10000).mul(arr[i][i2].low).toNumber()
          total += decimal.add(arr[i][i2].highCoin, arr[i][i2].mediumCoin).add(arr[i][i2].lowCoin).toNumber()
        }
      }
      console.log(total)
      return arr
    }
  },
  components: { MutualTimeline, MutualTable },
  created () {
    this.$store.commit('TITLE_VIEW', 'Línea del tiempo')
    const weeks = this.dividirArray(this.inversion.objBlock.daysInfo)
    this.weeks = this.formatearArray(weeks)
    this.week = this.weeks.length
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
