<template>
  <section>
    <v-form ref="message" v-model="valid">
        <v-card>
          <v-card-title class="mutual-title">
            <h2>Asunto: My Awsome Issue</h2>
          </v-card-title>
          <v-container class="messages" ref="chat">
            <v-layout row v-for="message in messages" :key="message.uuid" :justify-end="user ? message.admin : !message.admin" class="message">
              <v-flex xs11 sm9 md7>
                <v-card flat :color="message.admin ? 'blue lighten-2' : 'amber lighten-2'">
                  <v-layout row>
                    <v-card-title class="no-padding-bottom">
                      <h3>{{message.admin ? 'Admin' : 'User'}}</h3>
                    </v-card-title>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs3 v-if="message.imageBase64" @click="showImage(message.imageBase64)">
                      <div class="image-container">
                      <div class="message-image" :style="'background-image: url('+ message.imageBase64 + ')'"></div>
                      </div>
                    </v-flex>
                    <v-flex :xs9="message.imageBase64 ? true : false" :xs12="message.imageBase64 ? false : true">
                      <v-card-text>
                        {{message.message}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <span class="date">{{message.date}}</span>
                </v-card>  
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-text>
            <v-text-field 
            textarea
            rows="2"
            class="message-text"
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
    <v-dialog v-model="dialog" content-class="ticket-modal" scrollable>
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
    },
    mounted () {
      this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight)
    }
  }
</script>
<style>
  .message-text {
    padding-top: 0;
  }
  .message-text label {
    top: 14px !important;
  }
  .message-text textarea{
    font-size: 13px !important;
  }
</style>

<style scoped>
  .message-image {
    height: 100%;
    transition: .3s;
    cursor: pointer;
    background-size: cover;
    background-position: center;
  }
  .image-container {
    height: 100%;
    padding: 16px;
    padding-right: 0;
  }
  .message-image:hover {
    opacity: .7;
  }
  .messages {
    overflow-y: scroll;
    height: 50vh;
  }
  .modal-image {
    align-self: center;
  }
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
  .ticket-modal {
    width: auto !important;
  }
</style>