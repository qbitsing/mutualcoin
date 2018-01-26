<template>
  <section>
    <v-form ref="message" v-model="valid">
        <v-card>
          <v-card-title class="mutual-title">
            <h2>Asunto: {{ticket.subjet}}</h2>
          </v-card-title>
          <v-container class="messages" ref="chat">
            <v-layout row v-for="message in ticket.answers" :key="message.uuid" :justify-end="user ? message.from === 'admin' : message.from === 'user'" class="message">
              <v-flex xs11 sm9 md7>
                <v-card flat :color="message.from == 'admin' ? 'blue lighten-2' : 'amber lighten-2'">
                  <v-layout row>
                    <v-card-title class="no-padding-bottom">
                      <h3 class="message-title">{{message.from}}</h3>
                    </v-card-title>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs3 v-if="message.file" @click="showImage(message.file)">
                      <div class="image-container">
                      <div class="message-image" :style="'background-image: url('+ message.file + ')'"></div>
                      </div>
                    </v-flex>
                    <v-flex :xs9="message.file ? true : false" :xs12="message.file ? false : true">
                      <v-card-text>
                        {{message.body}}
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
            <v-btn color="primary" :loading="loading" :disabled="imageData.loading" @click="answer">Responder</v-btn>
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
  import mutation from '~/plugins/mutations/answer'
  import swal from 'sweetalert2'
  import socket from '~/plugins/socket'
  import api from '~/plugins/axios'
  moment.locale('es')
  export default {
    components: {FileChooser},
    data () {
      return {
        newMessage: false,
        loading: false,
        valid: false,
        dialog: false,
        modalImage: '',
        imageData: {
          url: null,
          loading: false,
          image: null
        },
        message: null
      }
    },
    props: {
      ticket: {
        type: Object,
        required: true
      },
      user: Boolean
    },
    updated () {
      if (this.newMessage) {
        try {
          this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight)
          this.newMessage = false
        } catch (e) {
          console.log(e.message)
          console.log(e.stack)
        }
      }
    },
    methods: {
      async answer () {
        if (this.$refs.message.validate()) {
          let message = {
            body: this.message,
            id: this.ticket.id,
            date: moment().format('MM/DD/YYYY, h:mm a'),
            from: this.user ? 'user' : 'admin'
          }
          if (this.imageData.url) {
            message.file = this.imageData.url
          }
          try {
            this.loading = true
            const res = await api(mutation(message), 'post', this.$store.state.authToken)
            this.loading = false
            if (res.data.data.errors) {
              swal('Ooops...', 'Error al responder.', 'error')
            }
            this.clear()
          } catch (e) {
            swal('Ooops...', 'Error al responder.', 'error')
          }
        }
      },
      showImage (image) {
        this.modalImage = image
        this.dialog = true
      },
      clear () {
        this.$refs.message.reset()
        this.imageData = {
          url: null,
          loading: false,
          image: null
        }
      },
      async realTime () {
        const client = await socket().catch((err) => {
          console.error(`Error en la conexion con el servidor en tiempo real: ${err.message}`)
        })
        if (client.connected) {
          client.emit('suscribe', 'ticket/response')
          client.removeListener('ticket/response')
          client.on('ticket/response', (e) => {
            if (e.id === this.ticket.id) {
              const newMessage = e.answers.slice(-1)[0]
              this.newMessage = true
              this.ticket.answers.push(newMessage)
            }
          })
        }
      }
    },
    mounted () {
      try {
        this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight)
      } catch (e) {
        console.log(e.message)
        console.log(e.stack)
      }
    },

    created () {
      this.realTime()
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
  .message-title {
    text-transform: capitalize;
  }
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