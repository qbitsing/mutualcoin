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
                <v-card flat :color="message.admin ? 'blue lighten-2' : 'amber lighten-2'">
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
            <v-btn color="primary" :disabled="imageData.loading" @click="answer">Responder</v-btn>
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
  import mutation from '~/plugins/mutations/answer'
  import FileChooser from '~/components/fileChooser.vue'
  import moment from 'moment'
  import swal from 'sweetalert2'
  import api from '~/plugins/axios'
  moment.locale('es')
  export default {
    components: {FileChooser},
    data () {
      return {
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
            const res = await api(mutation(message), 'post', this.$store.state.authToken)
            if (res.data.data.errors) {
              swal('Ooops...', 'Error al responder.', 'error')
            }
            console.log(res)
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