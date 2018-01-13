<template>
<div>
  <h1>{{message}}</h1>
</div>
</template>
<script>
import Mqtt from 'web-mqtt-client'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      message: 'ola'
    }
  },
  mounted () {
    const MqttClient = Mqtt(window)
    var client = new MqttClient({
      host: 'mqtt://localhost',
      port: 1883
    })
    client.connect()
    this.$store.commit('TITLE_VIEW', 'Tablero')
  }
}
</script>
