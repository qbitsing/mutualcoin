<template>
  <v-card class="card">

    <h2 v-if="data._block.state == 'active'" :class="data._block.state" >Activo</h2>
    <h2 v-else-if="data._block.state == 'waiting'" :class="data._block.state" >En espera</h2>
    <h2 v-else-if="data._block.state == 'running'" :class="data._block.state" >Corriendo</h2>
    <h2 v-else-if="data._block.state == 'paused'" :class="data._block.state" >Pausado</h2>
    <h2 v-else-if="data._block.state == 'finished'" :class="data._block.state" >Finalizado</h2>
    <h2 v-else class="cancel" >Cancelado</h2>
    <v-layout column justify-center align-center text-align-center>
      <img :src="`/${data._block._coin.name}.png`">
      <p>Plan {{data._block.name}} de {{data._block.amount}} {{data._block._coin.name}} </p>
      <p v-if="data._block.state != 'active'">Fecha Inicio: {{data._block.startDate}}</p>
      <p v-if="data._block.state != 'active'">Días corridos: {{data._block.runDays}}</p>
      <p v-else>Cupo: {{data._block.amountLeft}}</p>
      <p>Mi inversión: {{data.amount}} {{data._block._coin.name}}</p>
      <v-card-actions>
        <v-btn @click="goTimeline(data.uuid)" color="secondary">Info</v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    methods: {
      goTimeline (uuid) {
        this.$router.push({path: `/panel/user/${uuid}`})
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
