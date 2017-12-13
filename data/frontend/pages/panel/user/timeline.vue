<template>
  <v-layout column>
    <v-card>
      <v-card-title >
        {{state}}
      </v-card-title>
        <mutual-timeline :data="data"></mutual-timeline>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
            v-for="(week, index) in weeks"
            :step="index+1"
            :editable=""
            :complete="(e1 >= (index+1))"

          ></v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content v-for="(week, index) in weeks" :step="index+1">
              <v-card color="grey lighten-1" class="mb-5" height="200px">{{e1}}</v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
    </v-card>
  </v-layout>
</template>
<script>
  import MutualTimeline from '~/components/timeline.vue'
  export default {
    middleware: 'auth',
    layout: 'dashboard',
    data () {
      return {
        e1: 3,
        data: {
          per: 80,
          start: '25/03/2017',
          finish: '17/06/2017'
        },
        state: 'Activo',
        weeks: [{
          alto: 4,
          medio: 3,
          bajo: 1
        }, {
          alto: 4,
          medio: 3,
          bajo: 1
        }, {
          alto: 4,
          medio: 3,
          bajo: 1
        }, {
          alto: 4,
          medio: 3,
          bajo: 1
        }]
      }
    },
    components: { MutualTimeline },
    beforeMount () {
      this.$store.commit('TITLE_VIEW', 'Línea del tiempo')
    }
  }
</script>
<style lang="css">
</style>
