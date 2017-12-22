<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data._coin.name}.png`">
      <p>Plan de: {{data.amount}} {{data._coin.name}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Restantes: {{data.amountLeft}} {{data._coin.name}}</p>
      <v-card-actions>
        <v-btn @click="propsDialog.state = true" color="primary" >Invetir</v-btn>
      </v-card-actions>
      <mutual-dialog :dialog="propsDialog">
        <section slot="contenDialog">
            <v-form ref ="inversion">
              <v-card flat class="no-padding-bottom">
                <v-card-text class="no-padding-bottom">
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <v-select
                      :items="wallets"
                      v-model="wallet"
                      label="Billetera"
                      item-text="name"
                      :rules="inputRules"
                      single-line
                      bottom
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                      type="Number"
                      label="Monto"
                      min="0"
                      :rules="amountRules"
                      v-model="amount"
                      @keypress="preventLetters">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <h2>Porcentajes de inversión</h2>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                      type="Number"
                      label="Alto"
                      min="0"
                      :rules="precentRules"
                      v-model="high"
                      @keypress="preventAll">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                      type="Number"
                      label="Medio"
                      min="0"
                      :rules="precentRules"
                      v-model="medium"
                      @keypress="preventAll">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                      type="Number"
                      label="Bajo"
                      min="0"
                      :rules="precentRules"
                      v-model="bottom"
                      @keypress="preventAll">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="submit">invertir</v-btn>
                  <v-btn color="error" @click="clear">cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
        </section>
      </mutual-dialog>
    </v-layout>
  </v-card>
</template>
<script>
import MutualDialog from '~/components/dialog.vue'
import api from '~/plugins/axios'
import swal from 'sweetalert2'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      valid: false,
      amount: '',
      high: null,
      medium: null,
      bottom: null,
      wallet: null,
      wallets: [{name: '1'}],
      propsDialog: { state: false, title: 'Invertir en bloque' },
      inputRules: [
        (v) => !!v || 'Campo requerido.'
      ],
      amountRules: [
        (v) => !!v || 'Campo requerido.',
        (v) => v > 0 || 'Debe ser mayor a cero.',
        (v) => v <= this.data.amountLeft || 'El monto debe ser menor al cupo del bloque.'
      ],
      precentRules: [
        (v) => this.totalP === 100 || 'La suma de los porcentajes debe ser 100'
      ]
    }
  },
  methods: {
    async submit () {
      if (this.$refs.inversion.validate()) {
        const data = {
          blockUserToCreate: {
            block: this.data.uuid,
            high: this.high,
            medium: this.medium,
            low: this.bottom,
            amount: this.amount,
            user: this.authUser.uuid
          }
        }
        const res = await api('blockUser/create', data, 'post', this.authToken)
        if (res.status === 200) {
        // const self = this
          const blocks = this.$store.state.blocks.map(e => {
            if (e.uuid === this.data.uuid) e.amountLeft = e.amountLeft - this.amount
            return e
          })
          this.$store.commit('SET_BLOCKS', blocks)
          swal('Excelente', 'Inversión guardada con éxito', 'success')
          this.clear()
        } else {
          swal('Ooops...', 'Error al invertir', 'error')
        }
      }
    },
    preventLetters (ev) {
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        if (ev.keyCode !== 46) ev.preventDefault()
      }
      if (this.amount.toString().length > 9) ev.preventDefault()
    },
    preventAll (ev) {
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        ev.preventDefault()
      }
    },
    clear () {
      this.$refs.inversion.reset()
    }
  },
  computed: {
    ...mapState(['authUser', 'authToken']),
    totalP () {
      return parseInt(this.high) + parseInt(this.medium) + parseInt(this.bottom)
    }
  },
  components: { MutualDialog },
  props: {
    data: { type: Object, required: true }
  }
}
</script>
<style lang="css" scoped>
img{
  box-sizing: border-box;
  max-width: 80%;
  width: 100px;
  margin: 20px
}
.card {
  padding-bottom: 20px;
}
.no-padding-bottom {
  padding-bottom: 0;
}
</style>
