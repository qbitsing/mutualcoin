<template>
  <v-dialog 
    v-model="dialog.state" 
    persistent 
    max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ dialog.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <slot name="contenDialog"/>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn 
          color="blue darken-1" 
          flat
          @click.native="dialog.state = false" @click="closeDialog">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: {
      dialog: {type: Object, required: true}
    },
    methods: {
      closeDialog () {
        this.$emit('close')
      }
    }
  }
</script>
<style>
table {
  overflow-y: scroll !important;
}
</style>

