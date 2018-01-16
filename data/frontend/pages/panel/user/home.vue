<template>
<div>
  <h1>home</h1>
  <div class="btcwdgt-chart"></div>
  <a @click="logout">cerrar sesion</a>
</div>

</template>
<script>
import {mapState} from 'vuex'
import realTime from '~/plugins/clientRealTime'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  computed: mapState(['blocks', 'userInversions']),
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
