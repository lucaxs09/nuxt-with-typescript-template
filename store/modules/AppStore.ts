import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'


import { store } from "~/store";



export interface IAppState {
  loading: boolean;
  loadingText: string;


  language: string

}

@Module({ dynamic:true , store, name: 'app' })
class appStore extends VuexModule implements IAppState {
  loading: boolean = false;
  loadingText: string = "";

  public language = 'es';


  get API_URL():string{
    return process.env.API_URL;
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
