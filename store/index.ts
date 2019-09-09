import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from "~/store/modules/AppStore";

export interface IRootState {
  app: IAppState

}
Vue.use(Vuex);

export const store = new Vuex.Store<IRootState>({});
// Declare empty store first, dynamically register all modules later.
export default () => store;
