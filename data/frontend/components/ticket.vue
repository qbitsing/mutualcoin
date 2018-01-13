<template>
  <section>
    <v-layout row>
        <v-flex xs12>
          <v-form ref="message" v-model="valid">
              <v-card>
                <v-card-title class="mutual-title">
                  <h2>Asunto: My Awsome Issue</h2>
                </v-card-title>
                <v-card-text class="no-padding-bottom">
                  <v-text-field 
                  textarea
                  :rules="[v => !!v || 'Debe escribir un mensaje.']"
                  v-model="message"
                  label="Escriba su respuesta">
                  </v-text-field>
                  <file-chooser :imageData="imageData"></file-chooser>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="ask">Responder</v-btn>
                  <v-btn color="warning">Cerrar Ticket</v-btn>
                </v-card-actions>
              </v-card>
          </v-form>
        </v-flex>
    </v-layout>
    <v-layout row v-for="message in messages" :key="message.uuid" :justify-end="user ? message.admin : !message.admin" class="message">
      <v-flex xs11 sm9 md7>
        <v-card flat :color="message.admin ? 'blue lighten-2' : 'amber lighten-2'">
          <v-layout row>
            <v-card-title class="no-padding-bottom">
              <h3>{{message.admin ? 'Admin' : 'User'}}</h3>
            </v-card-title>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 v-if="message.imageBase64" @click="showImage(message.imageBase64)">
              <img :src="message.imageBase64" alt="imagen" class="white">
            </v-flex>
            <v-flex xs12>
              <v-card-text>
                {{message.message}}
              </v-card-text>
            </v-flex>
          </v-layout>
          <span class="date">{{message.date}}</span>
        </v-card>  
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" scrollable width="1400px">
      <img class="modal-image" :src="modalImage" alt="">
    </v-dialog>
  </section>
</template>
<script>
  import FileChooser from '~/components/fileChooser.vue'
  import moment from 'moment'
  moment.locale('es')
  export default {
    components: {FileChooser},
    data () {
      return {
        valid: false,
        dialog: false,
        modalImage: '',
        imageData: {
          imageName: null
        },
        message: null
      }
    },
    props: {
      messages: {
        type: Array,
        required: true
      },
      user: Boolean
    },
    methods: {
      ask () {
        if (this.$refs.message.validate()) {
          let message = {
            message: this.message,
            admin: false,
            uuid: 'messageuuid',
            date: moment().calendar()
          }
          if (this.imageData.imageBase64) {
            message.imageBase64 = this.imageData.imageBase64
          }
          console.log(this.user)
          this.messages.unshift(message)
          this.$refs.message.reset()
          console.log(this.imageData.imageBase64)
          this.imageData = {
            imageName: ''
          }
        }
      },
      showImage (image) {
        this.modalImage = image
        this.dialog = true
      }
    }
  }
</script>
<style scoped>
  .message{
    position: relative;
    text-align: justify;
    margin-top: 15px !important;
  }
  .date{
    position: absolute;
    bottom: 1.5px;
    font-size: 13px;
    color: #fff;
    right: 16px;
  }
  .no-padding-bottom{
    padding-bottom: 0;
  }
  img {
    width: 100%;
  }
</style>
<style>
  .dialog--scrollable {
    display: grid;
    /* overflow: hidden; */
  }
</style>