<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app>
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      fixed 
      app 
      :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="$store.state.titleView"/>
      <v-spacer/>
      <v-menu 
        offset-y 
        origin="center center" 
        transition="scale-transition" 
        bottom 
        v-if="admin">
        <v-btn 
          icon 
          slot="activator">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile 
            v-for="item in itemConf" 
            :key="item.title" 
            @click="config(item.title)">
            <v-list-tile-title>
              <v-icon v-html="item.icon"/>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <mutual-dialog v-if="admin" :dialog="propsDialog">
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
              :loading="loading"
              color="primary"
              @click="submitMoneda"
              :disabled="!valid"
            >
              {{btnMoneda}}
            </v-btn>
            <v-btn
              color="error"
              @click="cancelarMoneda"
              :disabled="loading">
              Cancelar
            </v-btn>
          </v-form>
          <v-data-table
            :headers="coinHeader"
            :items="coinItems"
            class="elevation-1">
            <template 
              slot="items"
              scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.acronym }}</td>
              <td class="text-xs-right"><v-btn small color="warning" dark @click="editarMoneda(props.item)">editar</v-btn></td>
            </template>
          </v-data-table>
        </section>
        
      </mutual-dialog>
      <v-menu 
        offset-y
        origin="center center"
        transition="scale-transition"
        bottom>
        <v-btn 
          icon
          slot="activator">
          <v-icon>person_pin</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile 
            v-for="item in itemPerfil" 
            :key="item.title"
            @click="perfil(item.title)">
            <v-list-tile-title>
              <v-icon v-html="item.icon"/>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import api from '~/plugins/axios'
import swal from 'sweetalert2'
import MutualDialog from '~/components/dialog.vue'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      admin: this.$store.state.authUser.admin,
      loader: null,
      loading: false,
      clipped: false,
      uuid: null,
      btnMoneda: 'Guardar',
      drawer: true,
      fixed: false,
      items: null,
      itemPerfil: null,
      itemConf: null,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      propsDialog: {state: false, title: ''},
      valid: false,
      name: null,
      acronym: null,
      coinItems: [],
      coinHeader: [
        {text: 'Nombre', value: 'name'},
        {text: 'Acronimo', value: 'acronym'},
        {text: 'Acciones', sortable: false}
      ],
      nameRules: [
        (v) => !!v || 'Nombre es requerido'
      ],
      acronymRules: [
        (v) => !!v || 'Acronimo es requerido'
      ]
    }
  },
  components: {MutualDialog},
  middleware: ['auth', 'coins'],
  computed: mapState(['coins']),

  created () {
    if (this.admin) {
      this.items = [
        { icon: 'apps', title: 'Home', to: '/panel/admin/home' },
        { icon: 'bubble_chart', title: 'Activar Bloque', to: '/panel/admin/activarbloque' },
        { icon: 'bubble_chart', title: 'Bloques en inversion', to: '/panel/admin/bloqueinversion' },
        { icon: 'bubble_chart', title: 'Usuarios', to: '/panel/admin/usuarios' },
        { icon: 'apps', title: 'Transaciones', to: '/panel/admin/transaciones' },
        { icon: 'apps', title: 'Estructura', to: '/panel/admin/estructura' },
        { icon: 'apps', title: 'Tickets', to: '/panel/admin/tickets' }
      ]
      this.itemConf = [
        {icon: 'perm_identity', title: 'Empresa', to: '/panel/admin/empresa'},
        {icon: 'message', title: 'Moneda', to: ''}
      ]
      this.itemPerfil = [
        {icon: 'perm_identity', title: 'Perfil'},
        {icon: 'message', title: 'Buzon'},
        {icon: 'exit_to_app', title: 'Salir'}
      ]
    } else {
      this.items = [
        { icon: 'apps', title: 'Home', to: '/panel/user/home' },
        { icon: 'apps', title: 'Historial', to: '/panel/user/historial' },
        { icon: 'bubble_chart', title: 'Oferta', to: '/panel/user/oferta' },
        { icon: 'bubble_chart', title: 'Usuarios', to: '/panel/user/usuarios' },
        { icon: 'apps', title: 'Transaciones', to: '/panel/user/transaciones' },
        { icon: 'apps', title: 'Estructura', to: '/panel/user/estructura' },
        { icon: 'apps', title: 'Tickets', to: '/panel/user/tickets' }
      ]
      this.itemPerfil = [
        {icon: 'perm_identity', title: 'Perfil'},
        {icon: 'message', title: 'Buzon'},
        {icon: 'exit_to_app', title: 'Salir'}
      ]
    }
    this.coinItems = this.coins
  },
  methods: {
    async perfil (el) {
      if (el === this.itemPerfil[2].title) {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } else if (el === this.itemPerfil[0].title) {
        this.$router.push('perfil')
      }
    },
    config (el) {
      if (el === this.itemConf[1].title) {
        this.propsDialog.state = true
        this.propsDialog.title = 'Registro de monedas'
      } else if (el === this.itemConf[0].title) {
        this.$router.push('/panel/admin/empresa')
      }
    },
    async submitMoneda () {
      if (this.$refs.formMoneda.validate()) {
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        try {
          if (this.btnMoneda === 'Guardar') {
            const data = {
              coinToCreate: {
                name: this.name,
                acronym: this.acronym
              }
            }
            const res = await api('coin/create', data, 'post', this.$store.state.authToken)
            if (res.status === 200) {
              this.$refs.formMoneda.reset()
              this.coinItems.push(res.data.coinCreated)
              this.$store.dispatch('setCoins', this.coinItems)
              swal('Excelente...', 'Moneda registrada correctamente', 'success')
            } else {
              console.log(res)
            }
          } else {
            const data = {
              coinToUpdate: {
                name: this.name,
                acronym: this.acronym
              }
            }
            const res = await api('coin/update/' + this.uuid, data, 'put', this.$store.state.authToken)
            if (res.status === 200) {
              this.coinItems.forEach((ele, index) => {
                if (ele.uuid === this.uuid) {
                  this.coinItems.splice(index, 1, res.data.coinUpdated)
                  this.$store.dispatch('setCoins', this.coinItems)
                }
              })
              this.btnMoneda = 'Guardar'
              this.$refs.formMoneda.reset()
              this.uuid = null
              swal('Excelente...', 'Moneda actualizada correctamente', 'success')
            } else {
              console.log(res)
            }
          }
          this[l] = false
          this.loader = null
        } catch (error) {

        }
      }
    },
    editarMoneda (el) {
      this.btnMoneda = 'Actualizar'
      this.name = el.name
      this.acronym = el.acronym
      this.uuid = el.uuid
    },
    cancelarMoneda () {
      this.uuid = null
      this.$refs.formMoneda.reset()
      this.btnMoneda = 'Guardar'
      this.name = null
      this.acronym = null
    }

  }
}
</script>
