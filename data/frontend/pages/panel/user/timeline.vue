<template>
  <v-layout column>
    <v-card>
      <v-card-title >
        {{state}}
      </v-card-title>
        <mutual-timeline :data="data"></mutual-timeline>
        <v-container grid-list-md text-xs-center>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <div class="wp">
                <v-btn
                v-for="n in data.nWeeks"
                class="wel"
                :color="n % 4 == 0 ? 'error' : 'primary'"
                @click="tableData.week = n"
                :disabled="n>tableData.weeks.length">
                  {{n}}
                </v-btn>
              </div>
              <mutual-table :data="tableData"></mutual-table>
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
            altoP: 4,
            altoM: 0.3,
            medioP: 3,
            medioM: 0.15,
            bajoP: 1,
            bajoM: 0.1
          }],
          week: 1
        },
        data: {
          dPass: 30,
          nWeeks: 16,
          start: '25/03/2017',
          finish: '17/06/2017'
        },
        state: 'Activo'
      }
    },
    components: { MutualTimeline, MutualTable },
    beforeMount () {
      this.$store.commit('TITLE_VIEW', 'Línea del tiempo')
      this.tableData.week = this.tableData.weeks.length
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
</style>
