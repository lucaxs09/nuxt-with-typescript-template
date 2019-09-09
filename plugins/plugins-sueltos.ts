import Vue from "vue";
import Toasted from "vue-toasted";
import VueRouter from "vue-router";

export default () => {
  Vue.use(VueRouter);

  Vue.use(Toasted, {
    iconPack: "material", // set your iconPack, defaults to material. material|fontawesome|custom-class
    duration: 4000,
    position: "bottom-center",
    theme: "toasted-primary"
  });
};
