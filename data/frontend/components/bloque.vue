<template>
  <v-card class="card">
    <v-layout column justify-center align-center>
      <img :src="`/${data.moneda}.png`">
      <p>Plan de: {{data.cant}} {{data.moneda}}</p>
      <p>Semanas: {{data.weeks}}</p>
      <p>Invertidos: {{data.inverted}} {{data.moneda}}</p>
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
              <v-flex
                xs12
                sm6>
                <v-text-field
                  v-model="name"
                  label="Moneda"
                  :rules="nameRules"
                  required />
              </v-flex>
              <v-flex
                xs12
                sm6>
                <v-text-field
                  v-model="acronym"
                  label="Acronimo"
                  :rules="acronymRules"
                  required/>
              </v-flex>
            </v-layout>
            <v-btn
              color="primary"
              @click="submitMoneda"
              :disabled="!valid"
            >
              Guardar
            </v-btn>
          </v-form>
          <v-data-table
            :headers="coinHeader"
            :items="coinItems"
            hide-actions
            class="elevation-1">
          <template slot="items" scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.acronym }}</td>
          </template>
        </v-data-table>

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
