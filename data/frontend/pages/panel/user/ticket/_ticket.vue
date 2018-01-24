<template>
  <mutual-ticket
  :ticket="ticket"
  user
  ></mutual-ticket>
</template>
<script>
import realTime from '~/plugins/userRealTime'
import MutualTicket from '~/components/ticket.vue'
import {mapState} from 'vuex'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'tickets', 'setTicket'],
  components: {MutualTicket},
  computed: mapState(['userInversions', 'blocks', 'tickets', 'ticket']),
  beforeDestroy () {
    this.$store.commit('SET_TICKET', null)
  },
  created () {
    realTime(this)
    this.$store.commit('TITLE_VIEW', 'Ticket')
  }
}
</script>
