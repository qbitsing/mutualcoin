<template>
  <v-card>
		<v-card-title class="mutual-title">
			<h2>Editar informacion</h2>
		</v-card-title>
  	<v-container class="pl-3 pr-3" grid-list-md text-xs-center>
      <v-form ref="profile" >
          <v-layout wrap>
            <v-flex xs12 text-xs-left>
            <h3>Información Personal</h3>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              label="Nickname"
              :rules="inputRules"
              v-model="userData.nickname"
              required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              label="Código de usuario"
              disabled
              :rules="inputRules"
              v-model="authUser.uuid"
              required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              v-model="userData.firstName"
              label="Nombres"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              v-model="userData.lastName"
              label="Apellidos"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-dialog
                v-model="modal"
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Fecha de nacimiento"
                  v-model="userData.birthdate"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="userData.birthdate" locale="es-col" autosave></v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              v-model="userData.age"
              type="number"
              label="Edad"
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
              :rules="inputRules"
              v-model="userData.bch"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 text-xs-left>
            <v-flex xs12 sm6>
              <v-select
              :items="gender"
              v-model="userData.spanishGender"
              label="Genero"
              ></v-select>
            </v-flex>
              <template>
                <v-select
                  label="Hobbies"
                  chips
                  tags
                  v-model="userData.hobbies"
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
          <v-layout wrap>
            <v-flex xs12 text-xs-left>
              <h3>Información de contácto</h3>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              label="Correo 1"
              v-model="userData.email"
              :rules="inputRules"
              required
              disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              v-model="userData.email2"
              label="Correo 2"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              v-model="userData.address"
              label="Direccion"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              v-model="userData.phone"
              label="Teléfono"
              ></v-text-field>
            </v-flex>
          </v-layout>
        <v-card-actions align-right>
            <v-btn>Link para Referir</v-btn>
            <v-btn color="warning" @click="propsDialog.state = true">Cambiar Contraseña</v-btn>
            <v-btn color="primary" :loading="loading" @click="update">Guardar</v-btn>
            <v-btn color="error" @click="clear">Cancelar</v-btn> 
        </v-card-actions>
         <mutual-dialog :dialog="propsDialog">
            <section slot="contenDialog">
                <v-form ref="passwordForm" lazy-validation>
                  <v-card flat class="no-padding-bottom">
                    <v-card-text>
                      <v-text-field 
                      v-model="lastPassword"
                      label="Actual Contraseña"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passRules"
                      ></v-text-field>
                      <v-text-field 
                      v-model="newPassword"
                      label="Nueva Contraseña"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passRules"
                      ></v-text-field>
                      <v-text-field 
                      v-model="confirm"
                      label="Confirmar Contraseña"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="confirmRules"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary" @click="changuePass" :loading="loading">Cambiar</v-btn>
                      <v-btn color="error" @click="clearPass">cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
            </section>
          </mutual-dialog>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import {mapState} from 'vuex'
import api from '~/plugins/axios'
import query from '~/plugins/queries/profile'
import MutualDialog from '~/components/dialog'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  components: { MutualDialog },
  data () {
    return {
      e1: true,
      propsDialog: {state: false, title: `Cambiar Contraseña`},
      modal: false,
      profileForm: false,
      loading: false,
      lastPassword: null,
      lastData: null,
      newPassword: null,
      confirm: null,
      userData: {},
      gender: ['Masculino', 'Femenino'],
      passRules: [
        (v) => !!v || 'Digite su contraseña.'
      ],
      confirmRules: [
        (v) => v === this.newPassword || 'Las contraseñas no coinciden.'
      ],
      inputRules: [
        (v) => !!v || 'Campo requerido.'
      ]
    }
  },
  methods: {
    async changuePass () {
      if (this.$refs.passwordForm.validate() && !this.loading) {
        this.loading = true
        this.loading = false
      }
    },
    async update () {
      if (this.$refs.profile.validate()) {
        this.loading = true
        if (this.userData.spanishGender) {
          this.userData.gender = this.userData.spanishGender === 'Masculino' ? 'male' : 'female'
        }
        const res = await api(`user/update/${this.authUser.uuid}`, {userToUpdate: this.userData}, 'put', this.authToken)
        console.log(res)
        this.loading = false
      }
    },
    clearPass () {
      this.$refs.passwordForm.reset()
    },
    clear () {
      this.userData.bch = this.lastData.bch
      this.userData.age = this.lastData.age
      this.userData.firstName = this.lastData.firstName
      this.userData.lastName = this.lastData.lastName
      this.userData.address = this.lastData.address
      this.userData.email2 = this.lastData.email2
      this.userData.phone = this.lastData.phone
      this.userData.bchType = this.lastData.bchType
      this.userData.birthdate = this.lastData.birthdate
      this.userData.spanishGender = this.lastData.spanishGender
      this.userData.hobbies = this.lastData.hobbies
      this.userData.nickname = this.lastData.nickname
    },
    remove (item) {
      this.userData.hobbies.splice(this.userData.hobbies.indexOf(item), 1)
      this.userData.hobbies = [...this.userData.hobbies]
    }
  },
  async created () {
    this.$store.commit('TITLE_VIEW', 'Perfil')
    const res = await api('/', {}, 'get', this.authToken, {params: query(this.authUser.uuid)})
    this.userData = res.data.data.user
    this.lastData = {
      bch: this.userData.bch,
      age: this.userData.age,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      address: this.userData.address,
      email2: this.userData.email2,
      phone: this.userData.phone,
      bchType: this.userData.bchType,
      birthdate: this.userData.birthdate,
      hobbies: this.userData.hobbies,
      nickname: this.userData.nickname
    }
    if (this.userData.gender) {
      this.userData.spanishGender = this.userData.gender === 'male' ? 'Masculino' : 'Femenino'
      this.lastData.spanishGender = this.userData.spanishGender
    }
  },
  computed: mapState(['authUser', 'authToken'])
}
</script>
<style scoped>
.no-padding-bottom {
  padding-bottom: 0;
}
</style>
