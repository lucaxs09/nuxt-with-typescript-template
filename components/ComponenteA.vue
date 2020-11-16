<template>
    <div>
        Component Name: {{name}}

      <v-btn color="accent" @click="onClick">Editar</v-btn>

      Contenido:
      <v-card>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </div>

</template>

<script lang="ts">
  import {Component, Model, Prop, PropSync, Vue} from 'vue-property-decorator'
  import {AppStore} from "~/store/AppStore";

    @Component({
    })
    export default class ComponenteA extends Vue {
      @Prop({default: 'Otro'}) name;
      contador = 123;

      public onClick(){

        AppStore.saveUser({
          name:'asdasd',
        });

        console.log('Enviando evento');
        this.$emit("saludo", {
          name: 'asdasd'
        });

      }




    }
</script>

<style lang="scss">

</style>
