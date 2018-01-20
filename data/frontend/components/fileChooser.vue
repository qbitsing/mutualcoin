<template>
 <section>
  <v-layout class="relative" v-show="!image" row>
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
  <v-layout row v-show="image">
    <div class="image-container" :style="`background-image: url`">
    </div>
  </v-layout>
 </section>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    props: ['imageData'],
    data () {
      return {
        image: null
      }
    },
    methods: {
      pickFile () {
        this.$refs.image.click()
      },
      validBase64Image (image) {
        let code = image.split('base64,')[1]
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
              if (this.validBase64Image(fileReader.result)) {
                resolve(fileReader.result)
              } else {
                swal('Ooops...', 'La imagen seleccionada no es válida o está dañada.', 'error')
              }
            })
          })
          this.image = await wait
          console.log(this.imageData.imageBase64.length)
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
  .image-container {
        width: 120px;
    height: 120px;
    overflow: hidden;
  }
  img {
    max-width: 100%;
  }
</style>
