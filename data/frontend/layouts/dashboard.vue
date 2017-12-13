<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
      >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="$store.state.titleView"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y origin="center center" transition="scale-transition" bottom v-if="admin">
        <v-btn icon slot="activator">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in itemConf" :key="item.title" @click="config(item.title)">
            <v-list-tile-title>
              <v-icon v-html="item.icon"></v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <mutual-dialog :dialog="propsDialog">
          <form action="" slot="contenDialog">
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="Moneda" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Acronimo" required></v-text-field>
              </v-flex>
            </v-layout>
          </form>
      </mutual-dialog>
      <v-menu  offset-y origin="center center" transition="scale-transition" bottom>
        <v-btn icon slot="activator">
          <v-icon>person_pin</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in itemPerfil" :key="item.title" @click="perfil(item.title)">
            <v-list-tile-title>
              <v-icon v-html="item.icon"></v-icon>
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
import MutualDialog from '~/components/dialog.vue'
export default {
  data () {
    return {
      admin: this.$store.state.authUser.admin,
      clipped: false,
      drawer: true,
      fixed: false,
      items: null,
      itemPerfil: null,
      itemConf: null,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      propsDialog: {state: false, title: ''},
      moneda: {}
    }
  },
  components: {MutualDialog},
  beforeMount (){
    if (this.admin) {
      this.items = [
        { icon: 'apps', title: 'Home', to: '/panel/admin/home' },
        { icon: 'bubble_chart', title: 'Activar Bloque', to: '/panel/admin/activarbloque' },
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
        { icon: 'bubble_chart', title: 'Activar Bloque', to: '/panel/user/oferta' },
        { icon: 'bubble_chart', title: 'Usuarios', to: '/panel/user/usuarios' },
        { icon: 'apps', title: 'Transaciones', to: '/panel/user/transaciones' },
        { icon: 'apps', title: 'Estructura', to: '/panel/user/estrutura' },
        { icon: 'apps', title: 'Tickets', to: '/panel/user/tickets' }
      ]
      this.itemPerfil = [
        {icon: 'perm_identity', title: 'Perfil'},
        {icon: 'message', title: 'Buzon'},
        {icon: 'exit_to_app', title: 'Salir'}
      ]
    }
  },
  methods: {
    async perfil (el) {
      if (el === this.itemPerfil[2].title) {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    },
  config (el) {
      if (el === this.itemConf[1].title) {
        this.propsDialog.state = true
        this.propsDialog.title = 'Registro de monedas'
      } else if (el === this.itemConf[0].title) {
        this.$router.push('/panel/admin/empresa')
      }
    }
  }
}
</script>
