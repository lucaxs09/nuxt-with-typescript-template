<template>
    <v-container>
        <h1>Ejemplos con Nuxt TS</h1>

        <v-layout class="pa-2" column>
            <v-toolbar dense="">
                <h3>Vista persona:</h3>
                <v-spacer/>

                <nuxt-link to="/">Home</nuxt-link>

            </v-toolbar>
            <div class="pa-2">
                <label for="asd">Nombre:</label>
                <input class="border px-1" type="text" name="asd" id="asd" v-model="persona.nombre">

            </div>
            <hr>
            <div class="pa-2 blue-grey lighten-5">
                <persona-component @saludo="onPersonaSaludo($event)" :nombre="persona.nombre" :documento="persona.documento"></persona-component>
            </div>
        </v-layout>

    </v-container>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import PersonaComponent from "~/components/ejemplos/PersonaComponent.vue";
  @Component({
    components: { PersonaComponent  }
  })
  export default class PageEjemplos extends Vue {
    persona = {
      nombre: 'Juan',
      documento: 18263512
    };



    onPersonaSaludo(mensaje:string){
      // definimos 'mensaje' como string, porque sabemos que es una cadena.. pero puede
      // ser cualquier objeto

      alert(`Nuevo mensaje: '${mensaje}'`);
    }

  }
</script>

<style lang="scss">

</style>
