<template>
  <v-container>
    <v-card>
      <v-layout row wrap text-xs-center>
        <v-flex xs12 >
          <v-card flat color="grey lighten-4">
            Mis referidos
          </v-card>
        </v-flex>
      </v-layout>
      <v-tabs v-model="first">
        <v-tabs-bar color="grey lighten-2" ligth>
          <v-tabs-item
            v-for="tab in estructure"
            :key="tab.uuid"
            @click="unactivate('second')"
            :href="'#' + tab.uuid"
            ripple
          >
            {{ tab.nickname }}
          </v-tabs-item>
          <v-tabs-slider color="primary"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            v-for="user in estructure"
            :key="user.uuid"
            :id="user.uuid"
          >
            <v-card flat>
              <v-container text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6>
                    <span>Email: {{user.email}}</span>
                  </v-flex>
                  <v-flex xs6>
                    <span>Código: {{user.uuid}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-layout row wrap text-xs-center>
                <v-flex xs12 >
                  <v-card flat color="grey lighten-4">
                    {{user.line[0] ? 'Sus referidos' : 'No tiene referidos'}}
                  </v-card>
                </v-flex>
              </v-layout>
              <!-- second line -->
              <v-tabs v-model="second" v-show="user.line[0]">
                <v-tabs-bar color="grey lighten-2" ligth>
                  <v-tabs-item
                    v-for="tab in user.line"
                    @click="unactivate('third')"
                    :key="tab.uuid"
                    :href="'#' + tab.uuid"
                    ripple
                  >
                    {{ tab.nickname }}
                  </v-tabs-item>
                  <v-tabs-slider color="primary" v-show="second!= '-1'"></v-tabs-slider>
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
                            <span>Email: {{user2.email}}</span>
                          </v-flex>
                          <v-flex xs6>
                            <span>Código: {{user2.uuid}}</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-layout row wrap text-xs-center>
                        <v-flex xs12 >
                          <v-card flat color="grey lighten-4">
                            {{user2.line[0] ? 'Sus referidos' : 'No tiene referidos'}}
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <!-- start-third-line -->
                        <v-tabs v-model="third" v-show="user2.line[0]">
                          <v-tabs-bar color="grey lighten-2" ligth>
                            <v-tabs-item
                              v-for="tab in user2.line"
                              :key="tab.uuid"
                              :href="'#' + tab.uuid"
                              ripple
                            >
                              {{ tab.nickname }}
                            </v-tabs-item>
                            <v-tabs-slider color="primary" v-show="third != '-1'"></v-tabs-slider>
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
                                      <span>Email: {{user3.email}}</span>
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
  import estructure from '~/plugins/queries/estructure'
  import {mapState} from 'vuex'
  import api from '~/plugins/axios'
  export default {
    middleware: 'auth',
    computed: mapState(['authUser', 'authToken']),
    layout: 'dashboard',
    data () {
      return {
        first: '-1',
        second: '-1',
        third: '-1',
        estructure: null
      }
    },
    methods: {
      unactivate (unactivable) {
        if (unactivable === 'third') this.third = '-1'
        else this.second = '-1'
      }
    },
    async created () {
      this.$store.commit('TITLE_VIEW', 'Estructura')
      const res = await api('/', {}, 'get', this.authToken, {params: estructure(this.authUser.uuid)})
      this.estructure = res.data.data.user.line
    }
  }
</script>