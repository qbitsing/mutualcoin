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
    <div class="image-container" :style="`background-image: url(${image})`">
      <div v-show="loading" class="center-flex image-loader">
       <v-progress-circular  indeterminate v-bind:size="50" color="primary"></v-progress-circular>
      </div>
      <div class="center-flex clear-mask">
        <v-btn class="image-btn" fab dark small color="error">
          <v-icon dark>clear</v-icon>
        </v-btn>
      </div>
    </div>
  </v-layout>
 </section>
</template>
<script>
  import api from '~/plugins/axios'
  import swal from 'sweetalert2'
  export default {
    props: ['imageData'],
    data () {
      return {
        image: null,
        loading: true
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
  
          const res = api({})
          console.log(res)
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
  .center-flex {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

  }
  .clear-mask {
    background: rgba(200,200,200,0);
    transition: .4s;
  }
  .image-container:hover .clear-mask {
    background: rgba(200,200,200,.6);
  }
  .image-container:hover .image-btn{
    transform: scale(1);
  }
  .image-loader {
    background: rgba(200,200,200,.6);
    display: none;
  }
  .image-container {
    background-size: cover;
    background-position: center;
    width: 120px;
    border-radius: 2px;
    height: 120px;
    overflow: hidden;
  }
  .image-btn {
    transform: scale(0);
    transition: .4s;
  }
  img {
    max-width: 100%;
  }
</style>
