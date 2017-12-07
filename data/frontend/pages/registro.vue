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
          v-bind:items="billeteras"
          v-model="e2"
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
          label="Confirme su contraseña"
          v-model="confirmPassword"
          :type= "'password'"
          :rules="confirmPassRules"
          counter
          ></v-text-field>
        </v-form>
        <v-btn
        block
        @click="submit"
        :disabled="!valid"
        >
        Registrarse
        </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        valid: false,
        e1: true,
        e2: null,
        billeteras: [
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
      submit () {
        if (this.$refs.form.validate()) {
          // Peticion
        }
      }
    }
  }
</script>
