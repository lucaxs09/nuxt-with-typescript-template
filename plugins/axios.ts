import { NuxtAxiosInstance } from "~/node_modules/@nuxtjs/axios";
import { App } from "~/core/App";
import { AuthStore } from "~/store/AuthStore";
import { AxiosError } from "~/node_modules/axios";
// import AppToast from "~/core/utils/AppToast";

export default function({ $axios, route, redirect }) {
  const axios:NuxtAxiosInstance = $axios;
  let lastError = null;

  $axios.setHeader('Content-Type', 'application/json');

  // interceptors
  axios.onRequest(config => {

    if(AuthStore.logged){
      // send tokens
      const token = AuthStore.userToken;
      Object.assign(config.headers,{
        'Authorization': `Bearer ${token}`
      });
    }

  });
  // interceptor
  axios.onResponseError((err: AxiosError) => {
    if (!err.response) {
      // network error
    } else {
      // http status code
      const code = err.response.status;
      // response data
      const response = err.response.data;
    }

    const displayErrorMessage = (message:string)=>{
      lastError = err;
      // AppToast.error(message);
      setTimeout(() => {
        lastError = null;
      }, 3000);
    };

    if (!err.config.hasOwnProperty("errorHandler") || err.config["errorHandler"] != false) {
      if(!err.response){
        // AppToast.error('Error de conexión.');
      }else if(lastError === null){
        if(err.response.status === 422 && 'errors' in err.response.data){
          let mensajes:string[] = Object.values(err.response.data.errors);
          displayErrorMessage(mensajes[0]);

        }else if ("message" in err.response.data) {
          displayErrorMessage(err.response.data.message);
        } else if ("errors" in err.response.data) {
          let mensajes:string[] = Object.values(err.response.data.errors);

          displayErrorMessage(mensajes[0]);

        }
      }
    }


    if(err.response.status === 401){
      // unauthorized--> checkSession
      AuthStore.checkLogin();
      if(!AuthStore.logged){
        AuthStore.SET_RETURN_URL({ ...route });
        redirect('/login');
      }
    }
  });

  // store $axios instance in process
  process['$axios'] = $axios;

  // store $axios instance in App global static class
  App.$axios = $axios;
}
