import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from "~/store";

@Module({ dynamic:true , store, name: 'app',namespaced: true, stateFactory: true  })
class appStore extends VuexModule   {
  loading: boolean = false;
  loadingText: string = "";
  vermenu: boolean = true;
  showAppBar:boolean = false;
  public language = 'es';


  get API_URL():string{
    return process.env.API_URL;
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



}


export const AppStore = getModule(appStore);
