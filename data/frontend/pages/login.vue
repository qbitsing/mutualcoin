<template>
  <v-layout justify-center align-center>
    <v-flex xs12 md6 lg4>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
        <v-form @submit="login" v-model="valid" ref="form" lazy-validation>
          <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          ></v-text-field>
          <v-text-field
          name="input-10-1"
          label="Contraseña"
          v-model="password"
          @keyup.13="login"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          :rules="passRules"
          counter
          ></v-text-field>
          <div>
            <v-btn
              :loading="loading"
              @click="login"
              :disabled="!valid"
              >
              Entrar
            </v-btn>
            <nuxt-link to="/olvido">¿Olvidaste tu contraseña?</nuxt-link>
          </div>
        </v-form>
        <div class="register">
          <span>¿No tienes una cuenta? <nuxt-link to="/registro">Regístrate.</nuxt-link></span>
        </div>
    </v-flex>
  </v-layout>
</template>
<style scoped>
  .register{
    margin-top: 20px;
  }
</style>
<script>
import swal from 'sweetalert2'
export default {
  middleware: 'auth',
  data: () => ({
    valid: true,
    e1: true,
    loader: null,
    loading: false,
    password: '',
    email: '',
    emailRules: [
      (v) => !!v || 'Digite su e-mail'
    ],
    passRules: [
      (v) => !!v || 'Digite su contraseña'
    ]
  }),
  methods: {
    async login () {
      if (this.$refs.form.validate() && !this.loading) {
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        try {
          await this.$store.dispatch('login', {
            datas: {
              email: this.email,
              password: this.password
            }
          })
          const user = this.$store.state.authUser
          if (user.admin) {
            this.$router.push('panel/admin/home')
          } else {
            this.$router.push('panel/user/home')
          }
        } catch (e) {
          this.password = ''
          swal('Ooops...', e.message, 'error')
        }
        this[l] = false
        this.loader = null
      }
    }
  }
}
</script>
