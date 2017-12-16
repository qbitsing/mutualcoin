<template>
  <v-layout row>
    <v-flex xs10 offset-xs1 class="mutual-table">
        <v-layout row>
          <v-flex xs12 class="no-padding">
            <v-card tile flat color="white">
              <v-card-text>
                <h2>
                  {{data.pay ? 'Pago de las cuatro semanas' : `Ganancias Semana ${data.week}`}}
                </h2>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text><h4>Alto</h4></v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text><h4>Medio</h4></v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text><h4>Bajo</h4></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text>{{data.weeks[data.week-1].altoP}}%</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text>{{data.weeks[data.week-1].medioP}}%</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text>{{data.weeks[data.week-1].bajoP}}%</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text>{{data.weeks[data.week-1].altoM}} {{data.moneda}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text>{{data.weeks[data.week-1].medioM}} {{data.moneda}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text>{{data.weeks[data.week-1].bajoM}} {{data.moneda}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    data: {type: Object, required: true}
  }
}
</script>

<style lang="css">
</style>
