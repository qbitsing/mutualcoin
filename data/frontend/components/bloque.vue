<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.amount}} {{data.coin}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Restantes: {{data.amountLeft}} {{data.coin}}</p>
      <v-card-actions>
        <v-btn @click="propsDialog.state = true" color="primary" >Invetir</v-btn>
      </v-card-actions>
      <mutual-dialog :dialog="propsDialog">
        <section slot="contenDialog">
          <v-form
            v-model="valid"
            ref="formMoneda"
            lazy-validation>
            <v-layout wrap>
              <h2>Awesome form</h2>
            </v-layout>
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
      propsDialog: { state: false, title: 'Invertir en bloque' }
    }
  },
  components: { MutualDialog },
  props: {
    data: { type: Object, required: true }
  }
}
</script>
<style lang="css">
img{
  box-sizing: border-box;
  max-width: 80%;
  width: 100px;
  margin: 20px
}
.card {
  padding-bottom: 20px;
}
</style>
