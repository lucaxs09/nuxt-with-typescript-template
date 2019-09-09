<template>
  <v-layout column class="align-center pa-5">
    <h1>{{title}}</h1>
    <span class="sub-text">{{subtext}}</span>
    <hr>

    <nuxt-link to="/ejemplos">Ver ejemplos</nuxt-link>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


@Component({
  components: {
  },
  middleware: "authenticated",
  head:{
    title: 'Home',
  },
})
export default class Home extends Vue {
  // properties
  title:string = 'Welcome!';
  showSubtext:boolean = false;

  // calculated properties
  get subtext():string{
    return this.showSubtext && 'Nuxt with TS Template' || 'Loading...';
  }


  // life-cycles
  created(){
    console.log('Home page created.');
  }

  mounted(){
    console.log('Home page mounted.');
    setTimeout(() => {
      this.showSubtext = true;
    },3000);
  }

  destroyed(){
    console.log('Home page was destroyed.');
  }

  // basic methods
  doSomething(){
    console.log('Hello from nuxt with ts.');
  }
}
</script>
<style>
 .sub-text{
   color: #495057;
   font-size: 16px;
 }
</style>
