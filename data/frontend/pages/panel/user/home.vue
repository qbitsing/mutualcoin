<template>
<div>
  <h1>home</h1>
  <div class="btcwdgt-chart"></div>
  <a @click="logout">cerrar sesion</a>
</div>

</template>
<script>
import {mapState} from 'vuex'
import realTime from '~/plugins/userRealTime'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  computed: mapState(['userInversions', 'blocks', 'tickets']),
  created () {
    realTime(this)
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
    }
  }
}
</script>
