<template>
  <div class="parent">
    <v-icon large class="start" color="white">play_arrow</v-icon>
    <v-progress-linear value="60" height="15" color="warning"></v-progress-linear>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>
<style lang="css">
.parent {
  position: relative;
}
  .start{
    background: rgb(8, 163, 61);
    border-radius: 50%;
  }
</style>
