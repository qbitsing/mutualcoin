<template>
  <v-card>
		<v-card-title class="mutual-title">
			<h2>Editar informacion</h2>
		</v-card-title>
  	<v-container class="pl-3 pr-3" grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
					label="Nickname"
					v-model="userData.nickname"
					required
					></v-text-field>
        </v-flex>
				<v-flex xs12 sm6>
          <v-text-field
					v-model="userData.name"
					label="Nombres y apellidos"
					></v-text-field>
        </v-flex>
      </v-layout>
			<v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
					label="Correo 1"
          v-model="userData.email"
					required
					disabled
					></v-text-field>
        </v-flex>
				<v-flex xs12 sm6>
          <v-text-field
          v-model="userData.secondEmail"
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
          v-model="userData.bch"
					></v-text-field>
        </v-flex>
        <v-flex xs12 text-xs-left>
          <p>Hobbies</p>
          <template>
           <v-select
              label="Escribe tu hobbie y pulsa enter para agregarlo"
              chips
              tags
              solo
              append-icon=""
              v-model="userData.hobies"
            >
              <template slot="selection" scope="data">
                <v-chip
                  close
                  color="primary"
                  text-color="white"
                  @input="remove(data.item)"
                  :selected="data.selected"
                >
                  <strong>{{ data.item }}</strong> 
                </v-chip>
              </template>
            </v-select>
          </template>
        </v-flex>
      </v-layout>
    <v-card-actions align-right>
      <v-btn>Link para Referir</v-btn>
      <v-btn color="primary">Guardar</v-btn>
      <v-btn color="error">Cancelar</v-btn> 
    </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
import {mapState} from 'vuex'
import api from '~/plugins/axios'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  data () {
    return {
      chips: ['Programming', 'Playing video games', 'Watching', 'Sleeping'],
      userData: {}
    }
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  },
  async created () {
    this.$store.commit('TITLE_VIEW', 'Perfil')
    const res = await api(`user/${this.authUser.uuid}`, {}, 'get', this.authToken)
    this.userData = res.data[0]
  },
  computed: mapState(['authUser', 'authToken'])
}
</script>