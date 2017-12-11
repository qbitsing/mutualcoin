<template>
  <v-layout justify-center align-center>
    <v-flex xs12 md6 lg4>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
        <v-form v-model="valid" ref="form">
          <v-text-field
            label="Nickname"
            v-model="nickname"
            :rules="nickRules"
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-select
            v-bind:items="wallets"
            v-model="wallet"
            label="Billetera"
            single-line
            bottom
          ></v-select>
          <v-text-field
            label="Llave pública"
            v-model="code"
            :rules="codeRules"
          ></v-text-field>
          <v-text-field
            label="Contraseña"
            v-model="password"
            :type= "'password'"
            :rules="passRules"
            counter
          ></v-text-field>
          <v-text-field
            @keyup.13="submit"
            label="Confirme su contraseña"
            v-model="confirmPassword"
            :type= "'password'"
            :rules="confirmPassRules"
            counter
          ></v-text-field>
        </v-form>
        <v-btn
          block
          :loading="loading"
          @click="submit"
          :disabled="loading"
          >
        Registrarse
        </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import api from '~/plugins/axios'
import swal from 'sweetalert2'
export default {
  data () {
    return {
      valid: false,
      loader: null,
      loading: false,
      e1: true,
      wallet: null,
      wallets: [
        { text: 'Blockchain' },
        { text: 'Blockchain' },
        { text: 'Blockchain' }
      ],
      nickname: '',
      nickRules: [
        (v) => !!v || 'Digite su nickname.'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Digite su e-mail.'
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail invalido.'
      ],
      password: '',
      passRules: [
        (v) => !!v || 'Digite su contraseña.'
      ],
      code: '',
      codeRules: [
        (v) => !!v || 'Digite su llave pública.'
      ],
      confirmPassword: '',
      confirmPassRules: [
        (v) => this.password === v || 'Las contraseñas no coinciden'
      ]
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        try {
          const data = {
            userToCreate: {
              nickname: this.nickname,
              email: this.email,
              bchType: this.wallet.text,
              bch: this.code,
              password: this.password
            }
          }
          const res = await api('user/register', data, 'post')
          this[l] = false
          this.loader = null
          if (res.status === 200) {
            swal('Excelente...', 'Usuario registrado correctamente', 'success')
            this.$router.push('/login')
          } else {
            console.log(res)
          }
        } catch (e) {
          this[l] = false
          console.log(e)
          swal('Ooops...', 'El correo electrónico ' + this.email + ' ya se encuentra registrado', 'error')
          this.email = ''
        }
      }
    }
  }
}
</script>
