import NuxtConfiguration from "@nuxt/config";
require("dotenv").config();
const isDev = process.env.NODE_ENV !== "production";
const API_URL = process.env.API_URL;

const config: NuxtConfiguration = {
  mode: "spa",
  globalName: "App",
  generate: {
    fallback: true
  },
  env: {
    apiUrl: API_URL
  },
  axios: {
    baseURL: process.env.API_URL,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      }
    ]
  },
  build:{
    hardSource: true,
    parallel: true,
    transpile:[
      'vuex-module-decorators'
    ],

  },
  modules: [
    "@nuxtjs/dotenv", "@nuxtjs/axios",
    "@nuxtjs/pwa", '@nuxtjs/style-resources'
  ],
  plugins: [
    "@/plugins/axios",
    "@/plugins/vuetify",
    "@/plugins/element-ui",
    "@/plugins/moment",
    "@/plugins/plugins-sueltos"

  ],

  styleResources: {
    scss: [

      'assets/app-styles/variables.scss',
      'assets/app-styles/main.scss',

    ]
  },
  /*
   ** Global CSS
   */
  css: [
    "assets/app-styles/bootstrap/scss/bootstrap.scss",
    "vuetify/dist/vuetify.min.css",
    // "element-ui/lib/theme-chalk/index.css",
  ]
};

export default config;
