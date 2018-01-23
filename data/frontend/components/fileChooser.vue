<template>
 <section>
  <v-layout v-show="!imageData.image" row>
      <v-btn @click="pickFile" dark color="primary">
        <v-icon left>camera</v-icon>
        Imagen
      </v-btn> 
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
      >
  </v-layout>
  <v-layout row v-show="imageData.image">
    <div class="image-container" :style="`background-image: url(${imageData.image})`">
      <div v-show="imageData.loading" class="center-flex image-loader">
       <v-progress-circular  indeterminate v-bind:size="50" color="primary"></v-progress-circular>
      </div>
      <div class="center-flex clear-mask">
        <v-btn class="image-btn" @click="unsetImage" fab dark small color="error">
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
              if (fileReader.result.length < 5000000) {
                if (this.validBase64Image(fileReader.result)) {
                  resolve(fileReader.result)
                } else {
                  resolve({error: 'La imagen seleccionada está dañada.'})
                }
              } else {
                resolve({error: 'La imagen seleccionada no puede pesar más de 5mb.'})
              }
            })
          })
          const fileReaderResponse = await wait
          if (fileReaderResponse.error) {
            swal('Ooops...', fileReaderResponse.error, 'error')
          } else {
            this.imageData.loading = true
            this.imageData.image = fileReaderResponse
            const token = this.$store.state.authToken
            const res = await api({base64: fileReaderResponse}, 'post', token, {}, 'upload/')
            this.imageData.loading = false
            this.imageData.url = res.data.name
          }
        }
      },
      async unsetImage () {
        const token = this.$store.state.authToken
        const res = await api({name: this.imageData.url}, 'post', token, {}, 'upload/delete')
        if (res.status === 200) {
          this.imageData.url = null
          this.imageData.image = null
        }
      }
    }
  }
</script>
<style scoped>
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
