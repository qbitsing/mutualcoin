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
  export default {
    props: ['imageData'],
    methods: {
      pickFile () {
        this.$refs.image.click()
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
          this.imageData.imageName = files[0].name
          console.log(this.imageData)
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
