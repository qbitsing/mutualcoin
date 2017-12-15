<template>
  <v-layout column>
    <v-card>
      <v-card-title>
        <v-layout row wrap align-center>
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
        <v-flex d-flex offset-xs1 offset-sm0 xs10 sm5>
          <v-alert color="info" v-if="pausedDays" icon="info" value="true">
            Este bloque a sido pausado por {{pausedDays}} días.
          </v-alert>
        </v-flex>
        </v-layout>
      </v-card-title>
        <mutual-timeline :data="data"></mutual-timeline>
        <v-container grid-list-md text-xs-center>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <div class="wp">
                <v-btn
                v-for="n in data.nWeeks"
                :flat="tableData.week == n ? true : false"
                :key="n"
                class="wel"
                :color="n % 4 == 0 ? 'error' : 'primary'"
                @click="selectWeek(n)"
                :disabled="n>tableData.weeks.length">
                  {{n}}
                </v-btn>
              </div>
              <mutual-table :data="tableData"></mutual-table>
              <mutual-table v-show="tableData.week % 4 == 0" :data="payData"></mutual-table>
            </v-flex>
          </v-layout>
        </v-container>
    </v-card>
  </v-layout>
</template>
<script>
  import MutualTimeline from '~/components/timeline.vue'
  import MutualTable from '~/components/table.vue'
  export default {
    middleware: 'auth',
    layout: 'dashboard',
    data () {
      return {
        tableData: {
          e1: 3,
          moneda: 'BTC',
          weeks: [{
            altoP: 5,
            altoM: 0.3,
            medioP: 5,
            medioM: 0.3,
            bajoP: 5,
            bajoM: 0.3
          }, {
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 1,
            bajoM: 0.1
          }, {
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 1,
            bajoM: 0.1
          }, {
            pay: true,
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 1,
            bajoM: 0.1
          },
          {
            altoP: 5,
            altoM: 0.3,
            medioP: 5,
            medioM: 0.3,
            bajoP: 5,
            bajoM: 0.3
          }, {
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 1,
            bajoM: 0.1
          }, {
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 1,
            bajoM: 0.1
          }, {
            pay: true,
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 0,
            bajoM: 0
          }],
          week: 1
        },
        data: {
          dPass: 58,
          nWeeks: 16,
          start: '25/03/2017',
          finish: '17/06/2017',
          inverted: 2,
          amount: 10
        },
        state: 'Activo',
        pausedDays: 12,
        payData: {
          moneda: 'ETH',
          pay: true,
          weeks: [{
            altoM: 0,
            altoP: 0,
            bajoP: 0,
            bajoM: 0,
            medioM: 0,
            medioP: 0
          }],
          week: 1
        }
      }
    },
    methods: {
      selectWeek (n) {
        this.tableData.week = n
        this.payData.week = 1
        if (n % 4 === 0) {
          this.payData.week = (n / 4) + 1
        }
      }
    },
    components: { MutualTimeline, MutualTable },
    beforeMount () {
      this.$store.commit('TITLE_VIEW', 'Línea del tiempo')
      this.tableData.week = this.tableData.weeks.length
      if (this.tableData.week % 4 === 0) {
        this.payData.week = (this.tableData.week / 4) + 1
      }
      this.payData.moneda = this.tableData.moneda
      for (let index = 0; index < this.tableData.week; index++) {
        let i = index + 1
        if (i % 4 === 0) {
          i = index - 3
          let block = {
            altoM: 0,
            altoP: 0,
            bajoP: 0,
            bajoM: 0,
            medioM: 0,
            medioP: 0
          }
          for (i; i <= index; i++) {
            block.altoM += this.tableData.weeks[i].altoM
            block.altoP += this.tableData.weeks[i].altoP
            block.medioM += this.tableData.weeks[i].medioM
            block.medioP += this.tableData.weeks[i].medioP
            block.bajoM += this.tableData.weeks[i].bajoM
            block.bajoP += this.tableData.weeks[i].bajoP
          }
          this.payData.weeks.push(block)
        }
      }
    }
  }
</script>
<style lang="css">
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
