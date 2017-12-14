<template>
  <v-dialog v-model="dialog.state" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">{{dialog.title}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <slot name="contenDialog"></slot>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog.state = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
  export default {
    props: {
      dialog: {type: Object, required: true}
    },
    watch: {
      dialog (newVal, oldVal) {
        console.log(newVal, oldVal)
      }
    }
  }
</script>
