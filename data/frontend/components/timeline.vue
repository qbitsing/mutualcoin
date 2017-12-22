<template>
  <div class="parent">
    <v-container grid-list-md text-xs-center>
      <v-layout row>
        <v-flex xs1 center>
          <v-layout align-center justify-center class="max-height">
            <v-card dark class="date">
              {{data.start}}
            </v-card>
          </v-layout>
        </v-flex>
        <v-flex xs10>
          <v-progress-linear :value="(data.dPass*100)/(data.nWeeks*7)" height="15" color="primary"></v-progress-linear>
        </v-flex>
        <v-flex xs1 center>
          <v-layout align-center justify-center class="max-height">
            <v-card dark class="date">
              {{data.start}}
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        dialog: false
      }
    },
    beforeMount () {
      this.show = true
    },
    props: {
      data: {type: Object, required: true}
    }
  }
</script>
<style lang="css" scoped>
.max-height{
  height: 100%;
}
.date {
  padding: 4px;
}
@media (max-width: 1260px) {
  .date {
    font-size: 12px !important;
  }
}
</style>
