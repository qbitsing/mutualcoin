<template>
  <v-card>
		<v-card-title class="mutual-title">
			<h2>Editar informacion</h2>
		</v-card-title>
  	<v-container class="pl-3 pr-3" grid-list-md text-xs-center>

      <v-layout row wrap>
				<v-flex title xs12 text-xs-left class="mt-3 mb-3">
          Código de usuario: <span class="title">{{user.uuid}}</span>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
					label="Nickname"
					v-model="user.nickname"
					required
					></v-text-field>
        </v-flex>
				<v-flex xs12 sm6>
          <v-text-field
					v-model="user.name"
					label="Nombres y apellidos"
					></v-text-field>
        </v-flex>
      </v-layout>
			<v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
					label="Correo 1"
					required
					disabled
					></v-text-field>
        </v-flex>
				<v-flex xs12 sm6>
          <v-text-field
					label="Correo 2"
					></v-text-field>
        </v-flex>
				<v-flex xs12 sm6>
          <v-select
					required
					label="Billetera"
					></v-select>
        </v-flex>
				<v-flex xs12 sm6>
          <v-text-field
					label="Llave pública"
					required
					></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import {mapState} from 'vuex'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = this.authUser
    this.$store.commit('TITLE_VIEW', 'Perfil')
  },
  computed: mapState(['authUser'])
}
</script>