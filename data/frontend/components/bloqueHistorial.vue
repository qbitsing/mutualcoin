<template>
  <v-card class="card">

    <h2 v-if="data.objBlock.state == 'active'" :class="data.objBlock.state" >Activo</h2>
    <h2 v-else-if="data.objBlock.state == 'waiting'" :class="data.objBlock.state" >En espera</h2>
    <h2 v-else-if="data.objBlock.state == 'running'" :class="data.objBlock.state" >Corriendo</h2>
    <h2 v-else-if="data.objBlock.state == 'paused'" :class="data.objBlock.state" >Pausado</h2>
    <h2 v-else-if="data.objBlock.state == 'finished'" :class="data.objBlock.state" >Finalizado</h2>
    <h2 v-else class="cancel" >Cancelado</h2>
    <v-layout column justify-center align-center>
      <img :src="`/${data.objBlock._coin.name}.png`">
      <p>Plan {{data.objBlock.name}} de {{data.objBlock.amount}} {{data.objBlock._coin.name}} </p>
      <div v-if="data.objBlock.state != 'active'">
        <p>Fecha Inicio: {{data.objBlock.runDays}}</p>
        <p>Días corridos: {{data.objBlock.runDays}}</p>
      </div>
      <div v-else>
        <p>Cupo: {{data.objBlock.amountLeft}}</p>
      </div>
      <p>Mi inversión: {{data.amount}} {{data.objBlock._coin.name}}</p>
      <v-card-actions>
        <v-btn @click="goTimeline()" color="secondary">Info</v-btn>
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
    methods: {
      goTimeline () {
        this.$store.commit('SET_INVERSION', this.data)
        this.$router.push({path: `/panel/user/`})
      }
    },
    props: {
      data: { type: Object, required: true }
    }
  }
</script>
<style lang="css" scoped>
h2 {
  text-align: center;
  color: #fff;
}
   h2.paused {
    background: #B71C1C;
  }
  h2.waiting {
    background: #ffb300;
  }
  h2.running {
    background: #2E7D32;
  }
  h2.active {
    background: #2A77FF;
  }
  h2.finished {
    background: #B27900;
  }
  h2.cancel {
    background: #B71C1C;
  }
  img{
    box-sizing: border-box;
    max-width: 80%;
    width: 100px;
    margin: 20px;
  }
  .card {
    padding-bottom: 20px;
  }
</style>
