<template>
  <section class="mutual-progress">
      <div>
        <v-progress-circular  indeterminate v-bind:size="150" color="primary">
            <span class="progress-text">
                Cargando...
            </span>
        </v-progress-circular>
      </div>
  </section>
</template>
<style>
.mutual-progress {
    background: rgba(0,0,0,.4);
    z-index:10 !important;
    position: fixed!important;
    top: 0 !important;
    bottom: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0 !important;
    left: 0 !important;
}
.mutual-progress .progress-text {
    color: #fff;
    font-weight: bold;
}
</style>

