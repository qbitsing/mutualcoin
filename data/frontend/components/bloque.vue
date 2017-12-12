<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Invertidos: {{data.inverted}} {{data.moneda}}</p>
      <v-card-actions>
        <v-btn @click="dialog = true" color="primary" >Invetir</v-btn>
      </v-card-actions>
      <v-dialog
        v-model="dialog"
        max-width="500px"
        scrollable
      >
        <v-card>
            <v-toolbar style="flex: 0 0 auto;">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Inversión</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <h1>**Formulario con los datos**</h1>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success">Invetir</v-btn>
            <v-btn color="error">Cancelar</v-btn>
          </v-card-actions>
            <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
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
