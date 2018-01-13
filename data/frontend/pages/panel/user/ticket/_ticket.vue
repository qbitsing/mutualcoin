<template>
  <mutual-ticket
  :messages="messages"
  user
  ></mutual-ticket>
</template>
<script>
import MutualTicket from '~/components/ticket.vue'
export default {
  layout: 'dashboard',
  middleware: ['auth'],
  components: {MutualTicket},
  data () {
    return {
      messages: [
        { message: 'My other issue', admin: false, uuid: 'uuidticket', date: '11/01/2017 | 02:30 PM' },
        { message: 'Admin response', admin: true, uuid: 'uuidticket', date: '11/01/2017 | 02:30 PM' },
        { message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium labore doloremque alias tempore cumque nihil est accusantium. Voluptates vel accusantium velit assumenda itaque ut nostrum nesciunt ea eos a. Sunt!', admin: false, uuid: 'uuidticket', date: '25/12/2016 | 8:00 AM', imageBase64: 'https://www.marshallbatteries.com.au/wp-content/uploads/2017/11/joshua-hibbert-43527.jpg' }
      ]
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Ticket')
  }
}
</script>
