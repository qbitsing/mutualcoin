<template>
  <v-card :color="data.active ? `blue darken-4` : `grey darken-3`" class="card">
    <h2>{{data.active ? 'Activo' : 'Finalizado'}}</h2>
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Fecha Inicio: {{data.start}}</p>
      <p>Fecha Fin: {{data.finish}}</p>
      <v-card-actions>
        <v-btn color="grey" @click.stop="dialog = true">Info</v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    props: {
      data: { type: Object, required: true }
    }
  }
</script>
<style lang="css">
  h2{
    color: #000;
    text-align: center;
    background: #fff;
  }
  img{
    box-sizing: border-box;
    max-width: 80%;
    width: 100px;
    margin: 20px
  }
  .card {
    padding-bottom: 20px;
  }
</style>
