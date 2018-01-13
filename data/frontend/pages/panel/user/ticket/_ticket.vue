<template>
  <section>
    <v-layout row>
        <v-flex xs12>
          <v-form>
              <v-card>
                <v-card-title class="mutual-title">
                  <h2>Asunto: My Awsome Issue</h2>
                </v-card-title>
                <v-card-text class="no-padding-bottom">
                  <v-text-field 
                  textarea
                  v-model="message"
                  label="Escriba su respuesta">
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="ask">Responder</v-btn>
                  <v-btn color="warning">Cerrar Ticket</v-btn>
                </v-card-actions>
              </v-card>
          </v-form>
        </v-flex>
    </v-layout>
    <v-layout row v-for="message in messages" :key="message.uuid" :justify-end="message.admin" class="message">
      <v-flex xs11 sm9 md7>
        <v-card flat :color="message.admin ? 'blue lighten-2' : 'amber lighten-2'">
          <v-layout row>
            <v-card-title class="no-padding-bottom">
              <h3>{{message.admin ? 'Admin' : 'User'}}</h3>
            </v-card-title>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 v-if="message.imageBase64">
              <img :src="message.imageBase64" alt="imagen">            </v-flex>
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
  </section>
</template>
<script>
  import moment from 'moment'
  moment.locale('es')
  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    data () {
      return {
        message: null,
        messages: [
          { message: 'My other issue', admin: false, uuid: 'uuidticket', date: '11/01/2017 | 02:30 PM' },
          { message: 'Admin response', admin: true, uuid: 'uuidticket', date: '11/01/2017 | 02:30 PM' },
          { message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium labore doloremque alias tempore cumque nihil est accusantium. Voluptates vel accusantium velit assumenda itaque ut nostrum nesciunt ea eos a. Sunt!', admin: false, uuid: 'uuidticket', date: moment().subtract(5, 'days').calendar(), imageBase64: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg' }
        ]
      }
    },
    methods: {
      ask () {
        let message = {
          message: this.message,
          admin: false,
          uuid: 'messageuuid',
          date: moment().calendar()
        }
        console.log(message)
        this.messages.unshift(message)
        this.message = null
      }
    },
    created () {
      this.$store.commit('TITLE_VIEW', 'Ticket')
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
