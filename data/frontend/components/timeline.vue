<template>
  <div class="parent">
    <v-container grid-list-md text-xs-center>
      <v-layout row>
        <v-flex xs1 center>
          <v-layout align-center justify-center class="max-height">
            <v-card dark class="date">
              {{startDate}}
            </v-card>
          </v-layout>
        </v-flex>
        <v-flex xs10>
          <v-progress-linear :value="(data.runDays*100)/(data.weeks*7)" height="15" color="primary"></v-progress-linear>
        </v-flex>
        <v-flex xs1 center>
          <v-layout align-center justify-center class="max-height">
            <v-card dark class="date">
              {{finishDate}}
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      dialog: false,
      startDate: '',
      finishDate: ''
    }
  },
  created () {
    moment.locale('es')
    this.startDate = this.data.startDate || 'Sin Iniciar'
    if (!this.data.finishDate) {
      const restDays = (this.data.weeks * 7) - this.data.runDays
      this.finishDate = this.data.startDate ? moment().add(restDays, 'days').format('DD/MM/YY') : 'Sin Iniciar'
    } else {
      this.finishDate = this.data.finishDate
    }
  },
  props: {
    data: {type: Object, required: true}
  }
}
</script>
<style lang="css" scoped>
.max-height{
  height: 100%;
}
.date {
  padding: 4px;
}
@media (max-width: 1260px) {
  .date {
    font-size: 12px !important;
  }
}
</style>
