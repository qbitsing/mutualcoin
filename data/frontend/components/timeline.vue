<template>
  <div class="parent">
    <v-container grid-list-md text-xs-center>
      <v-layout row>
        <v-flex xs1 center>
          <v-tooltip top>
            <v-icon class="start" color="white" slot="activator">play_arrow</v-icon>
            <span>{{data.start}}</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs10>
          <v-progress-linear :value="(data.dPass*100)/(data.nWeeks*7)" height="15" color="primary"></v-progress-linear>
        </v-flex>
        <v-flex xs1 center>
          <v-tooltip top>
            <v-icon class="start" color="white" slot="activator">stop</v-icon>
            <span>{{data.finish}}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    props: {
      data: {type: Object, required: true}
    }
  }
</script>
<style lang="css">
  .start{
    width: 35px;
    height: 35px;
    background: rgb(8, 163, 61);
    border-radius: 50%;
    cursor: default;
  }
</style>
