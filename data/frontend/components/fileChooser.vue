<template>
  <v-layout class="relative" row>
      <v-text-field
      label="Seleccione una imagen"
      prepend-icon="attach_file"
      v-model="imageData.imageName"></v-text-field>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
      >
      <div class="activator" @click="pickFile"></div>
  </v-layout>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    props: ['imageData'],
    methods: {
      pickFile () {
        this.$refs.image.click()
      },
      validBase64Image () {
        let code = this.imageData.imageBase64.split('base64,')[1]
        try {
          atob(code)
          return true
        } catch (e) {
          return false
        }
      },
      async onFilePicked (e) {
        const files = e.target.files
        if (files[0]) {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(files[0])
          const wait = new Promise((resolve, reject) => {
            fileReader.addEventListener('load', (e) => {
              resolve(fileReader.result)
            })
          })
          this.imageData.imageBase64 = await wait
          console.log(this.imageData.imageBase64.length)
          if (!this.validBase64Image()) {
            swal('Ooops...', 'La imagen seleccionada no es válida o está dañada.', 'error')
            this.imageData = {
              imageName: null
            }
          } else {
            this.imageData.imageName = files[0].name
          }
        }
      }
    }
  }
</script>
<style scoped>
    .relative {
      position: relative
    }
  .activator {
    position: absolute;
    top: 0;
    bottom: 10px;
    left: 0;
    right: 0;
  }
</style>
