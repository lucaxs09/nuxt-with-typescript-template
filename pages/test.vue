<template>
    <div>
        <p>test page!</p>

        <v-btn @click="onBtnClick">show Loading</v-btn>



    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {AppStore} from "~/store/AppStore";

    @Component
    export default class test extends Vue {

      onBtnClick(){

        AppStore.SHOW_LOADING("cargando loading");
      }
    }
</script>

<style lang="scss">

</style>
