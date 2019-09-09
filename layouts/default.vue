<template>
  <div class="AppLayout">
    <nuxt/>
  </div>
</template>

<script lang="ts">
  import {Vue,Component} from 'vue-property-decorator';

  @Component({
    components: {

    }
  })
  export default class DefaultLayout extends  Vue {};
</script>

<style lang="scss">
  .AppLayout {
    height: 100vh;
    overflow-y: auto;
  }
</style>
