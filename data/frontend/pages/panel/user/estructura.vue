<template>
  <v-container>
    <v-card>
      <v-tabs v-model="first">
        <v-tabs-bar color="grey lighten-2" ligth>
          <v-tabs-item
            v-for="tab in httpResponse"
            :key="tab.uuid"
            :href="'#' + tab.uuid"
            ripple
          >
            {{ tab.nickname }}
          </v-tabs-item>
          <v-tabs-slider color="primary"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            v-for="user in httpResponse"
            :key="user.uuid"
            :id="user.uuid"
          >
            <v-card flat>
              <v-container text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6>
                    <span>Email: {{user.mail}}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span>Código: {{user.uuid}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-layout row wrap text-xs-center>
                <v-flex xs12 >
                  <v-card flat color="grey lighten-4">
                    Su linea
                  </v-card>
                </v-flex>
              </v-layout>
              <!-- second line -->
              <v-tabs v-model="second">
                <v-tabs-bar color="grey lighten-2" ligth>
                  <v-tabs-item
                    v-for="tab in user.line"
                    :key="tab.uuid"
                    :href="'#' + tab.uuid"
                    ripple
                  >
                    {{ tab.nickname }}
                  </v-tabs-item>
                  <v-tabs-slider color="primary"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                  <v-tabs-content
                    v-for="user2 in user.line"
                    :key="user2.uuid"
                    :id="user2.uuid"
                  >
                    <v-card flat>
                      <v-container text-xs-center>
                        <v-layout row wrap>
                          <v-flex xs6>
                            <span>Email: {{user2.mail}}</span>
                          </v-flex>
                          <v-flex xs6>
                            <span>Código: {{user2.uuid}}</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-layout row wrap text-xs-center>
                        <v-flex xs12 >
                          <v-card flat color="grey lighten-4">
                            Su linea
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <!-- start-third-line -->
                        <v-tabs v-model="third">
                          <v-tabs-bar color="grey lighten-2" ligth>
                            <v-tabs-item
                              v-for="tab in user2.line"
                              :key="tab.uuid"
                              :href="'#' + tab.uuid"
                              ripple
                            >
                              {{ tab.nickname }}
                            </v-tabs-item>
                            <v-tabs-slider color="primary"></v-tabs-slider>
                          </v-tabs-bar>
                          <v-tabs-items>
                            <v-tabs-content
                              v-for="user3 in user2.line"
                              :key="user3.uuid"
                              :id="user3.uuid"
                            >
                              <v-card flat>
                                <v-container text-xs-center>
                                  <v-layout row wrap>
                                    <v-flex xs6>
                                      <span>Email: {{user3.mail}}</span>
                                    </v-flex>
                                    <v-flex xs6>
                                      <span>Código: {{user3.uuid}}</span>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                              </v-card>
                            </v-tabs-content>
                          </v-tabs-items>
                        </v-tabs>
                      <!-- end-third-line -->
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
  import {mapState} from 'vuex'
  export default {
    middleware: 'auth',
    computed: mapState(['authUser']),
    layout: 'dashboard',
    data () {
      return {
        estructure: null,
        first: '-1',
        second: '-1',
        third: '-1',
        httpResponse: [
          { nickname: 'Nicolás',
            uuid: 'io1',
            mail: 'nmarias38@misena.edu.co',
            line: [
              { nickname: 'Sebastian',
                uuid: 'qw',
                mail: 'jsarias@misena.edu.co',
                line: [
                  { nickname: 'Omar', uuid: '2', mail: 'secondMail@misena.edu.co' },
                  { nickname: 'Gerardo', uuid: '2123', mail: 'gerardo@mutualcoin.com' }
                ] },
              { nickname: 'usario3',
                uuid: 'qwsad',
                mail: 'random@mail.com',
                line: [
                  { nickname: 'MockedUser', uuid: '2qeqe', mail: 'secondMail@misena.edu.co' },
                  { nickname: 'another', uuid: '2312dfs', mail: 'lMail@misena.edu.co' },
                  { nickname: 'random', uuid: '2312adf', mail: 'secondMail@misena.edu.co' },
                  { nickname: 'other', uuid: '2123', mail: 'gerardo@mutualcoin.com' }
                ] }
            ] }
        ]
      }
    },
    created () {
      console.log(this.estructure)
      this.$store.commit('TITLE_VIEW', 'Estructura')
    }
  }
</script>