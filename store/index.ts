import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({});
// Declare empty store first, dynamically register all modules later.
export default () => store;
