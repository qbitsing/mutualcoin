<template>
  <v-card>
      <v-card-title class="mutual-title">
        <h2>Lita de usuarios</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12  class="pt-2" >
              <v-card class="elevation-9">
                <v-data-table :headers="userHeader" :items="userItems" >
                  <template slot="items" scope="props">
                    <td class="text-xs-center">{{ props.item.nickname }}</td>
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ props.item.bchType }}</td>
                    <td class="text-xs-center">{{ props.item.bch }}</td>
                    <td class="text-xs-center">{{ props.item.codeReferred }}</td>
                    <td class="text-xs-center">{{ props.item.state }}</td>
                    <td class="text-xs-center"></td>
                  </template>
                  <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                      aun no tienes usuarios registrados :(
                    </v-alert>
                  </template>
                </v-data-table>
                </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
</template>
<script>
import {mapState} from 'vuex'
import api from '~/plugins/axios'
export default {
  ssr: false,
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {
      users: [],
      userHeader: [
        {text: 'Nickname', value: 'nickname', align: 'center'},
        {text: 'Email', value: 'email', align: 'center'},
        {text: 'Tipo billetera', value: 'bchType', align: 'center'},
        {text: 'Bch', value: 'bch', align: 'center'},
        {text: 'Codigo referido', value: 'codeReferred', align: 'center'},
        {text: 'Estado', value: 'state', align: 'center'},
        {text: 'Opciones', value: 'accountIsActive', align: 'center'}
      ]
    }
  },
  computed: {
    ...mapState(['authToken']),
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Usuarios')
  },
  methods: {
    async getUser () {
      const res = await api('user/all', {}, 'get', this.authToken)
      if (res.status === 200) {
        this.userItems = res.data
      }
    }
  }
}
</script>