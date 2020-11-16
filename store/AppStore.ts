import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from "~/store";
import axios from "~/plugins/axios";
import {App} from "~/core/App";
import {AuthStore} from "~/store/AuthStore";
import {User} from "~/core/models/user";

@Module({ dynamic:true , store, name: 'app',namespaced: true, stateFactory: true  })
class appStore extends VuexModule   {
  loading: boolean = false;
  loadingText: string = "";
  vermenu: boolean = true;
  showAppBar:boolean = false;
  language = 'es';

  app_title:string = "Titulo de la App";

  get API_URL():string{
    return process.env.API_URL;
  }


  @Mutation
  public SET_APP_TITLE(titulo:string){
    this.app_title = titulo;
  }

  @Action
  public async prueba(title){
    // const res = await App.$axios.$get('asd');
    setTimeout(() => {
      this.SET_APP_TITLE(title);
    },1000);
  }


  @Action
  public saveUser(user: User ){
    console.log('Guardarndo user ', user);

  }

  @Mutation
  public BOTON_MENU(menu: boolean){
    this.vermenu = menu;
  }
  @Mutation
  public SHOW_LOADING(label: string) {
    this.loadingText = label;
    this.loading = true;
  }
  @Mutation
  public HIDE_LOADING() {
    this.loadingText = "";
    this.loading = false;
  }
  @Mutation
  public SET_LANGUAGE(language: string) {
    this.language = language;
  }



  @Action
  public mostrarMenu(){

  }
}

export const AppStore = getModule(appStore);
