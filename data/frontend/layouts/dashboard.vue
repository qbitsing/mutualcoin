<template>
  <v-app dark>
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
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: null,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    beforeMount () {
      const user = 0
      if (user.admin) {
        this.items = [
          { icon: 'apps', title: 'Home', to: '/panel/admin/home' },
          { icon: 'bubble_chart', title: 'Activar Bloque', to: '/panel/admin/activarbloque' },
          { icon: 'bubble_chart', title: 'Usuarios', to: '/panel/admin/usuarios' },
          { icon: 'apps', title: 'Transaciones', to: '/panel/admin/transaciones' },
          { icon: 'apps', title: 'Estructura', to: '/panel/admin/estrutura' },
          { icon: 'apps', title: 'Tickets', to: '/panel/admin/tickets' }
        ]
      } else {
        this.items = [
          { icon: 'apps', title: 'Home', to: '/panel/user/home' },
          { icon: 'apps', title: 'Bloques Activos', to: '/panel/user/bloquesactivos' },
          { icon: 'bubble_chart', title: 'Activar Bloque', to: '/panel/user/oferta' },
          { icon: 'bubble_chart', title: 'Usuarios', to: '/panel/user/usuarios' },
          { icon: 'apps', title: 'Transaciones', to: '/panel/user/transaciones' },
          { icon: 'apps', title: 'Estructura', to: '/panel/user/estrutura' },
          { icon: 'apps', title: 'Ticket', to: '/panel/user/ticket' }
        ]
      }
    }
  }
</script>
