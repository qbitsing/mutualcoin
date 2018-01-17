<template>
  <v-card class="card">
    <v-layout column justify-center align-center class="layout">
      <h2 v-if="data.state === 'active'" :class="data.active ? 'active' : 'active'">
        {{'Activo'}}
      </h2>
      <h2 v-if="data.state === 'waiting'" :class="data.active ? 'waiting' : 'waiting'">
        {{'En espera'}}
      </h2>
      <h2 v-if="data.state === 'running'" :class="data.active ? 'running' : 'running'">
        {{'En marcha'}}
      </h2>
      <h2 v-if="data.state === 'paused'" :class="data.active ? 'paused' : 'paused'">
        {{'Pausado'}}
      </h2>
      <img :src="`/${data._coin.name}.png`">
      <p>Bloque: {{data.name}}</p>
      <p>Plan de: {{data.amount}} {{data.coin}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Invertidos:
        {{data.amount - data.amountLeft}}
      </p>
      <v-card-actions>
        <v-btn color="success" @click="goBlock(data.uuid)">Detalles</v-btn>
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
    },
    methods: {
      goBlock (block) {
        this.$router.push({path: `/panel/admin/${block}`})
      }
    }
  }
</script>
<style scoped>
  h2{
    color: #fff;
    text-align: center;
    width: calc(100% - 8px);
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
