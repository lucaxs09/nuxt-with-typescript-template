import { NuxtAxiosInstance } from "~/node_modules/@nuxtjs/axios";
import { App } from "~/core/App";
import { AuthStore } from "~/store/modules/AuthStore";
import { AxiosError } from "~/node_modules/axios";
import AppToast from "~/core/utils/AppToast";

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
    if (lastError === null && "message" in err.response.data) {
      lastError = err;
      AppToast.error(err.response.data.message);
      setTimeout(() => {
        lastError = null;
      }, 3000);
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
