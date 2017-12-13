<template>
  <v-card class="card">
    <h2 :class="data.active ? 'active' : 'finished'">
      {{data.active ? 'Activo' : 'Finalizado'}}
    </h2>
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Fecha Inicio: {{data.start}}</p>
      <p>Fecha Fin: {{data.finish}}</p>
      <p>Mi inversión: {{data.myInversion}} {{data.moneda

      }}</p>
      <v-card-actions>
        <v-btn :to="'timeline'" color="secondary">Info</v-btn>
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
  h2.active {
    color: #fff;
    text-align: center;
    background: #0F4AB2;
  }
  h2.finished {
    color: #fff;
    text-align: center;
    background: #B27900;
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
