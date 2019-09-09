<template>
    <v-layout column class="vista-persona">
        <div>
            <b>Nombre:</b> {{nombre}}
        </div>
        <div>
            <b>Documento:</b> {{documento}}
        </div>
        <div @click="botonOnClick()">
            <v-btn>Saludar</v-btn>
        </div>
    </v-layout>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class PersonaComponent extends Vue {
    @Prop({ type: String, required: true }) readonly nombre!: string;
    @Prop() documento!:number;


    botonOnClick(){
      // emitimos un evento al padre
      const mensaje = `Hola, soy ${this.nombre}`;
      this.$emit('saludo',mensaje);
      // 'saludo' es el Nombre del evento.. el padre lo maneja con @saludo=""
    }
  }
</script>

<style lang="scss">

</style>
