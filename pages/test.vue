<template>
    <div>
        <p :title="title" >{{title}}</p>
        <v-btn   @click="onBtnClick">show Loading</v-btn>

      <v-divider/>

      <v-container>

        <v-text-field  v-model="message"  ></v-text-field>
        <template v-if="true">
          <p><i>Message: {{message}}</i></p>
          <v-divider/>
        </template>

        <span>Dia: {{fecha | date}}</span>


        <componente-a @saludo="onSaludo" />

      </v-container>

    </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator'
    import {AppStore} from "~/store/AppStore";
    import {AuthStore} from "~/store/AuthStore";
  import ComponenteA from "~/components/ComponenteA.vue";
  import {User} from "~/core/models/user";

    @Component({
      components: {ComponenteA},
      'layout': 'dashboard',
      // 'middleware': ['admin']
    })
    export default class test extends Vue {
      count = 0;
      mostrar = false;
      lista = [1,2,3];
      message = "asdasd";
      fecha = "2020-10-10T11:12:13";
      dia = 5;



      get title(){
        return AppStore.app_title;
      }

      @Watch('message')
      onMessageChange(newValue, oldValue){
        console.log('El texto ha cambiado! Val:', this.message);
      }

      onChange(){
        console.log('buton changed!');


        let as = 'asdasd'
      }

      onSaludo(mensaje:User){
        console.log('Mensaje del child:', mensaje);
      }

      onBtnClick(){
        console.log('Clicked!');
        this.mostrar = true;

        AppStore.prueba("Nuevo titulo de la App");

        AppStore.SHOW_LOADING("cargando loading");
      }

    }
</script>

<style lang="scss">

</style>
