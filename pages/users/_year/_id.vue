<template>
 <div>
   <p>page show user</p>
 </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {Component, Vue} from "vue-property-decorator";

@Component({
  layout:'dashboard'
})
export default class ShowUserPage extends Vue{


  // on mounted
  mounted() {
    console.log(this.$route.params);
    const param = this.$route.params['id'];


    console.log('Page mounted! Id:', param);
  }

  destroyed(){
    console.log('By!');

  }


}
</script>
