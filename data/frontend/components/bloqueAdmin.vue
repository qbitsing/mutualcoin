<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Invertidos:
        <v-btn color="orange" @click.stop="dialog = true">{{data.inverted}} {{data.moneda}}</v-btn>
      </p>
      <v-card-actions>
        <v-btn color="green darken-1" >Iniciar</v-btn>
        <v-btn color="red darken-1" >Cancelar</v-btn>
      </v-card-actions>
    </v-layout>
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay=false
      scrollable
    >
      <v-card>
          <v-toolbar style="flex: 0 0 auto;">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Inversores</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <h1>Informacion de los inversionistas</h1>
        </v-card-text>
          <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
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
