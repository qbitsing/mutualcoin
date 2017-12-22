<template>
  <section>
    <v-card class="mb-2">
      <v-card-title class="mutual-title">
        <h2>Bloque {{block.name}} </h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs5 sm3>
              <v-card flat>
                <v-layout align-center>
                  <img class="coin" :src="`/${block._coin.name}.png`" alt="">
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex d-flex xs7 sm3>
              <v-layout row wrap>
                <v-flex d-flex>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Semanas</v-card-title>
                    <v-card-text class="no-padding" v-text="block.weeks"></v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Inversiones</v-card-title>
                    <v-card-text class="no-padding" v-text="`${block.amount - block.amountLeft} ${block._coin.name}`"></v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card flat>
                    <v-card-title primary class="title no-padding">Monto</v-card-title>
                    <v-card-text v-text="`${block.amount} ${block._coin.name}`" class="no-padding"></v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex offset-sm2 xs5 sm4>
              <v-card flat>
                <v-card-title primary class="title no-padding ">Estado</v-card-title>
                <v-card-text class="no-padding blue--text" v-if="block.state === 'active'">activo</v-card-text>
                <v-card-text class="no-padding green--text" v-if="block.state === 'running'">En marcha</v-card-text>
                <v-card-text class="no-padding yellow--text" v-if="block.state === 'waiting'">En espera</v-card-text>
                <v-card-text class="no-padding red--text" v-if="block.state === 'paused'">pausado</v-card-text>
                <v-card-actions >
                  <v-btn color="primary mx-0" @click="dialogGain">Agregar ganancias</v-btn>
                </v-card-actions>
              </v-card>
              <mutual-dialog :dialog="propsDialog">
                <section slot="contenDialog">
                  <v-form 
                    v-model="valid" 
                    ref="formGain" 
                    lazy-validation>
                    <v-layout wrap>
                      <v-flex xs12 sm12>
                        <v-card-title primary class="title no-padding ">Dia Numero: {{dayGain}}</v-card-title>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field type="Number" suffix="%" v-model="high" label="Alto" :rules="highRules" required/>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field type="Number" suffix="%" v-model="medium" label="Medio" :rules="mediumRules" required/>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-text-field type="Number" suffix="%" v-model="low" label="Bajo" :rules="lowRules" required/>
                      </v-flex>
                    </v-layout>
                    <v-btn color="primary" @click="addGain" :disabled="!valid"> {{btnGain}} </v-btn>
                    <v-btn color="error" @click="cancelGain" > Cancelar </v-btn>
                  </v-form>
                  <v-data-table :headers="gainHeader" :items="gainItems" class="elevation-1">
                    <template slot="items" scope="props">
                      <td>{{ props.item.day }}</td>
                      <td class="text-xs-right">{{ props.item.high }}</td>
                      <td class="text-xs-right">{{ props.item.medium }}</td>
                      <td class="text-xs-right">{{ props.item.low }}</td>
                      <td class="text-xs-right"><v-btn small color="warning" dark @click="editGain(props.item)">editar</v-btn></td>
                    </template>
                  </v-data-table>
                  <v-btn color="primary" :disabled="gainItems === null" @click="submitGain"> Guardar </v-btn>
                </section>
              </mutual-dialog>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text class="text-xs-center"><h4>Alto</h4></v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center"><h4>Medio</h4></v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center"><h4>Bajo</h4></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text class="text-xs-center">30%</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center">30%</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center">30%</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-2">
                <v-card-text class="text-xs-center">3 {{block._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-3">
                <v-card-text class="text-xs-center">3 {{block._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 class="no-padding">
            <v-card dark tile flat color="light-blue darken-4">
              <v-card-text class="text-xs-center">4 {{block._coin.name}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Bloques Invertidos</h2>
      </v-card-title>
      <v-card-text class="no-padding-top-bottom">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-data-table
            :headers="userHeader"
            :items="userItems"
            hide-actions
            class="elevation-1">
            <template 
              slot="items"
              scope="props">
              <td>{{ props.item._user.email }}</td>
              <td class="text-xs-right">{{ props.item.amount }}</td>
              <td class="text-xs-right">{{ props.item.high }}</td>
              <td class="text-xs-right">{{ props.item.medium }}</td>
              <td class="text-xs-right">{{ props.item.low }}</td>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">
                Aun no se a invertido :(
              </v-alert>
            </template>
          </v-data-table>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    
  </section>
</template>
<script>
import {mapState} from 'vuex'
import MutualDialog from '~/components/dialog.vue'
import swal from 'sweetalert2'
import api from '~/plugins/axios'
export default {
  layout: 'dashboard',
  middleware: ['auth', 'blocks', 'coins'],
  data () {
    return {
      block: null,
      userHeader: [
        {text: 'Usuario', value: 'user'},
        {text: 'Inversión', value: 'amount'},
        {text: 'Alto', value: 'high'},
        {text: 'Medio', value: 'medium'},
        {text: 'Bajo', value: 'low'}
      ],
      gainHeader: [
        {text: 'Dia', value: 'day', sortable: false},
        {text: 'alto', value: 'heigh', sortable: false},
        {text: 'Medio', value: 'medioum', sortable: false},
        {text: 'Bajo', value: 'low', sortable: false},
        {text: 'Opciones', sortable: false}
      ],
      btnGain: 'Agregar',
      high: 0,
      medium: 0,
      low: 0,
      dayGain: 1,
      lastDay: null,
      gainItems: [],
      userItems: [],
      propsDialog: {state: false, title: ''},
      valid: false,
      highRules: [
        (v) => !!v || 'Nombre es requerido'
      ],
      mediumRules: [
        (v) => !!v || 'Nombre es requerido'
      ],
      lowRules: [
        (v) => !!v || 'Nombre es requerido'
      ]
    }
  },
  components: {MutualDialog},
  computed: mapState(['blocks', 'coins']),
  methods: {
    dialogGain () {
      this.propsDialog = {state: true, title: 'Registro de ganancias'}
    },
    addGain () {
      if (this.btnGain === 'Agregar') {
        this.gainItems.push({day: this.dayGain, high: this.high, medium: this.medium, low: this.low})
        this.dayGain += 1
      } else {
        let index = this.gainItems.findIndex(ele => ele.day === this.dayGain)
        this.gainItems.splice(index, 1, {day: this.dayGain, high: this.high, medium: this.medium, low: this.low})
        this.btnGain = 'Agregar'
        this.dayGain = this.lastDay
        this.high = 0
        this.medium = 0
        this.low = 0
      }
      this.$refs.formGain.reset()
    },
    cancelGain () {
      this.$refs.formGain.reset()
    },
    editGain (ele) {
      this.lastDay = this.dayGain
      this.dayGain = ele.day
      this.btnGain = 'Actualizar'
      this.high = ele.high
      this.medium = ele.medium
      this.low = ele.low
    },
    async submitGain () {
      if (!this.gainItems) {
        try {
          console.log(api)
        } catch (error) {

        }
      } else {
        swal('Error...', 'No tienes ganancias agregadas', 'error')
      }
    }
  },
  created () {
    this.$store.commit('TITLE_VIEW', 'Bloque')
    let block = this.blocks.filter(block => block.uuid === this.$route.params.block)
    this.block = block[0]
  }
}
</script>
<style scoped>
.wp {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}
img{
  box-sizing: border-box;
  max-width: 80%;
  width: 100px;
  margin: 20px
}
.title, .mutual-text{
  padding: 7px !important;
}
.mutual-text{
  padding-top: 0 !important;
}
.coin{
  width: 75% !important;
}
.wel {
  min-width: 0;
  width: 100% !important;
  margin: 0 !important;
  border:0;
  border-radius: 0 !important;
}
.no-padding {
  padding: 0 !important;
}
.mutual-table {
  margin: 20px 0;
}
@media (max-width: 810px) {
  .coin {
    width: 90% !important;
  }
}
</style>

