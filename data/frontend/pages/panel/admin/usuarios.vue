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
                    <td class="text-xs-center">{{ props.item.accountIsActive }}</td>
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
  computed: mapState(['authToken']),
  data () {
    return {
      userHeader: [
        {text: 'Nickname', value: 'nickname'},
        {text: 'Email', value: 'email'},
        {text: 'Tipo billetera', value: 'bchType'},
        {text: 'Bch', value: 'bch'},
        {text: 'Codigo referido', value: 'codeReferred'},
        {text: 'Estado', value: 'accountIsActive'},
        {text: 'Opciones', value: 'accountIsActive'}
      ],
      userItems: []
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Usuarios')
    this.getUser()
    console.log(this.$apollo)
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