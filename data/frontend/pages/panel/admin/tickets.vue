<template>
  <v-container>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Tickets</h2>
      </v-card-title>
      <v-data-table
        :headers="ticketsHeader"
        :items="tickets"
        class="elevation-1">
        <template
          slot="items"
          scope="props">
          <tr @click="redirect(props.item.uuid)">
            <td class="text-xs-center">{{ props.item.issue}}</td>
            <td class="text-xs-center">
              <v-chip color="secondary" text-color="white">{{props.item.state}}</v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.lastMessage}}</td>
          </tr>  
        </template>
        <template slot="no-data">
        <v-alert :value="true" color="warning" icon="warning">
          Aún no has abierto ningún ticket
        </v-alert>
      </template>
      </v-data-table>
      
    </v-card>
  </v-container>
</template>
<script>
  import moment from 'moment'
  import api from '~/plugins/axios'
  import qTickets from '~/plugins/queries/tickets'
  import {mapState} from 'vuex'
  moment.locale('es')
  export default {
    data () {
      return {
        valid: false,
  
        loading: false,
        message: null,
        issue: '',
        inputRules: [(v) => !!v || 'Este campo es requerido.'],
        ticketsHeader: [
          {text: 'Asunto', align: 'center', value: 'issue'},
          {text: 'Estado', align: 'center', value: 'state'},
          {text: 'Ultimo Mensaje', align: 'center', value: 'lastMessage'}
        ],
        tickets: [
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'}
        ]
      }
    },
    layout: 'dashboard',
    middleware: 'auth',
    computed: mapState(['authToken']),
    methods: {
      async getTickets () {
        const res = await api({}, 'get', this.authToken, {params: qTickets()})
        console.log(res)
      }
    },
    created () {
      this.$store.commit('TITLE_VIEW', 'Tickets')
      this.getTickets()
    }
  }
</script>