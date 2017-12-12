<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Invertidos: {{data.inverted}} {{data.moneda}}</p>
      <v-card-actions>
        <v-btn color="orange" >Invetir</v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
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
