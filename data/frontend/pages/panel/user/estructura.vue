<template>
  <v-container>
    <v-card>
      <v-tabs v-model="first">
        <v-tabs-bar class="cyan" dark>
          <v-tabs-item
            v-for="user in firstLine"
            :key="user.uuid"
            :href="'#' + user.uuid"
            ripple
          >
            {{ user.nickname }}
          </v-tabs-item>
          <v-tabs-slider color="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            v-for="tab in firstLine"
            :key="tab.uuid"
            :id="tab.uuid"
          >
            <v-card flat v-show="first">
              User info
              <!-- second line -->
              <v-tabs v-model="second">
                <v-tabs-bar class="cyan" dark>
                  <v-tabs-item
                    v-for="user2 in secondLine"
                    :key="user2.uuid"
                    :href="'#' + user2.uuid"
                    ripple
                  >
                    {{ user2.nickname }}
                  </v-tabs-item>
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                  <v-tabs-content
                    v-for="tab2 in secondLine"
                    :key="tab2.uuid"
                    :id="tab2.uuid"
                  >
                    <v-card flat>
                      <v-card-text>{{ tab2.mail }}</v-card-text>
                    </v-card>
                  </v-tabs-content>
                </v-tabs-items>
              </v-tabs>
              <!-- end second line -->
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    middleware: 'auth',
    data () {
      return {
        first: '-1',
        second: '-1',
        third: '-1',
        firstLine: [
          { nickname: 'Nicolás', uuid: 'io1', mail: 'nmarias38@misena.edu.co' },
          { nickname: 'Nicolás', uuid: '2', mail: 'nmarias38@misena.edu.co' },
          { nickname: 'Nicolás', uuid: '3', mail: 'nmarias38@misena.edu.co' },
          { nickname: 'Nicolás', uuid: '4', mail: 'nmarias38@misena.edu.co' }
        ],
        secondLine: [
          { nickname: 'Sebastian', uuid: 'qw', mail: 'nmarias38@misena.edu.co' },
          { nickname: 'Sebastian', uuid: 'eqwe', mail: 'nmarias38@misena.edu.co' },
          { nickname: 'Nicolás', uuid: 'wqe', mail: 'nmarias38@misena.edu.co' },
          { nickname: 'Nicolás', uuid: 'wq2e', mail: 'nmarias38@misena.edu.co' }
        ]
      }
    },
    layout: 'dashboard',
    created () {
      this.$store.commit('TITLE_VIEW', 'Estructura')
    }
  }
</script>