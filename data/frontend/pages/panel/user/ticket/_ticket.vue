<template>
  <mutual-ticket
  :ticket="ticket"
  user
  ></mutual-ticket>
</template>
<script>
import MutualTicket from '~/components/ticket.vue'
import {mapState} from 'vuex'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'tickets', 'setTicket'],
  components: {MutualTicket},
  computed: mapState(['ticket']),
  created () {
    this.$store.commit('TITLE_VIEW', 'Ticket')
  }
}
</script>
