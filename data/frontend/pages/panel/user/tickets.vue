<template>
  <v-container>
    <v-card>
      <v-card-title class="mutual-title">
        <h2>Tickets</h2>
      </v-card-title>
      <v-data-table
        :headers="ticketsHeader"
        :items="tickets"
        class="elevation-1">
        <template
          slot="items"
          scope="props">
          <tr @click="redirect(props.item.uuid)">
            <td class="text-xs-center">{{ props.item.issue}}</td>
            <td class="text-xs-center">
              <v-chip color="secondary" text-color="white">{{props.item.state}}</v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.lastMessage}}</td>
          </tr>  
        </template>
        <template slot="no-data">
        <v-alert :value="true" color="warning" icon="warning">
          Aún no has abierto ningún ticket
        </v-alert>
      </template>
      </v-data-table>
      <v-card-actions class="text-xs-rigth">
        <v-btn @click="propsDialog.state = true" color="primary">Abrir Nuevo Ticket</v-btn>
      </v-card-actions>
      <mutual-dialog :dialog="propsDialog">
        <section slot="contenDialog">
            <v-form v-model="valid" ref="ticket" lazy-validation>
              <v-card flat class="no-padding-bottom">
                <v-card-text class="no-padding-bottom">
                  <v-text-field
                  label="Asunto"
                  :rules="inputRules"
                  v-model="issue">
                  </v-text-field>
                  <v-text-field
                    v-model="message"
                    label="Describa brevemente su inconformidad."
                    :rules="inputRules"
                    textarea
                  ></v-text-field>
                  <file-chooser :image-data="imageData"></file-chooser>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" :disabled="!valid || imageData.loading" @click="submit" :loading="loading">Abrir</v-btn>
                  <v-btn color="error" @click="clear">cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
        </section>
      </mutual-dialog>
    </v-card>
  </v-container>
</template>
<script>
  import MutualDialog from '~/components/dialog.vue'
  import FileChooser from '~/components/fileChooser.vue'
  export default {
    components: {MutualDialog, FileChooser},
    data () {
      return {
        valid: false,
        imageData: {
          url: null,
          loading: false,
          image: null
        },
        loading: false,
        message: null,
        issue: '',
        inputRules: [(v) => !!v || 'Este campo es requerido.'],
        propsDialog: {title: 'Abrir ticket', state: false},
        ticketsHeader: [
          {text: 'Asunto', align: 'center', value: 'issue'},
          {text: 'Estado', align: 'center', value: 'state'},
          {text: 'Ultimo Mensaje', align: 'center', value: 'lastMessage'}
        ],
        tickets: [
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'},
          {issue: 'My Awesome Title', lastMessage: '17/09/2017', state: 'Abierto', uuid: 'adasd'}
        ]
      }
    },
    methods: {
      submit () {
        if (this.$refs.ticket.validate()) {
          alert('Hello')
        }
      },
      clear () {
        this.$refs.ticket.reset()
        this.imageData.imageBase64 = ''
      },
      redirect (uuid) {
        this.$router.push({path: `/panel/user/ticket/${uuid}`})
      }
    },
    layout: 'dashboard',
    middlewae: 'auth',
    created () {
      this.$store.commit('TITLE_VIEW', 'Tickets')
    }
  }
</script>
<style scoped>
  tr {
    cursor: pointer;
  }
</style>
