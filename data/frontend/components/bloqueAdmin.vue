<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Invertidos:
        <v-btn color="primary" @click.stop="dialog = true">{{data.inverted}} {{data.moneda}}</v-btn>
      </p>
      <v-card-actions>
        <v-btn color="success" >Iniciar</v-btn>
        <v-btn color="error" >Cancelar</v-btn>
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
