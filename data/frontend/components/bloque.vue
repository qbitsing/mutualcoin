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
            <v-form>
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
                      :rules="numberRules"
                      v-model="amount"
                      @keypress="preventLetters">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary">invertir</v-btn>
                  <v-btn color="error">cancelar</v-btn>
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
export default {
  data () {
    return {
      valid: false,
      amount: '',
      wallet: null,
      wallets: [{name: '1'}],
      propsDialog: { state: false, title: 'Invertir en bloque' },
      inputRules: [
        (v) => !!v || 'Campo requerido.'
      ],
      numberRules: [
        (v) => !!v || 'Campo requerido.',
        (v) => v > 0 || 'Debe ser mayor a cero.'
      ]
    }
  },
  beforeMount () {
    console.log(this.data)
  },
  methods: {
    preventLetters (ev) {
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        if (ev.keyCode !== 46) ev.preventDefault()
      }
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
