<template>
    <v-app id="page-login">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-4">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Igresar al sistema</v-toolbar-title>
                                <v-spacer></v-spacer>

                            </v-toolbar>

                            <v-card-text pa-2>
                                <strong>Ingresa datos aleatorios.</strong>
                                <v-form>
                                    <v-text-field ref="inputUser" prepend-icon="person" @keyup.native.enter="submitForm()"
                                                  name="login" label="Usuario" autofocus placeholder="Ingresa tu usuario"
                                                  type="text" v-model="formLogin.user" >
                                    </v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" @keyup.native.enter="submitForm()"
                                                  name="password" label="Contraseña" placeholder="Ingresa la contraseña"
                                                  type="password" v-model="formLogin.password" >
                                    </v-text-field>
                                    <span v-if="st.error401" class="error--text">El usuario o la contraseña son incorrectos.</span>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="submitForm()">Ingresar</v-btn>
                            </v-card-actions>



                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
  import { Component, Ref, Vue } from "vue-property-decorator";
  import { AuthStore } from "~/store/modules/AuthStore";
  import { VTextField } from "vuetify/lib";
  import { AxiosError } from "~/node_modules/axios";

  import { Route } from "~/node_modules/vue-router";

  @Component({
    layout: "default"
  })
  export default class login extends Vue {
    @Ref('refForm') htmlForm:any;


    st = {
      loading: false,
      error401: false
    };

    formLogin = {
      user: '',
      password: ""
    };


    mounted(){
      console.log('Login page');

    }

    private redirectPage() {
      const route: Route = AuthStore.returnUrl;
      if (route !== null) {
        let location: string = route.fullPath;
        AuthStore.SET_RETURN_URL(null);
        this.$router.push(location);
        return;
      }
      this.$router.push("/");

    }

    submitForm() {

      let formValid = this.formLogin.user.length>3 && this.formLogin.password.length>3;
      formValid = true;// on test mode
      if(formValid){
        const {user,password} = this.formLogin;
        this.st.loading = true;
        this.st.error401 = false;
        AuthStore.login({user,password}).then(user => {
          this.redirectPage();
        }).catch((er: AxiosError) => {
          this.st.error401 = true;


          setTimeout(() => {
            this.st.error401 = false;
          },10000);
        }).finally(() => this.st.loading = false)
      }
    }

    resetForm(formName) {}
  }
</script>

<style lang="scss">
    #page-login{


    }
</style>
