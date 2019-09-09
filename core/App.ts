import { NuxtAxiosInstance } from "~/node_modules/@nuxtjs/axios";

class WebAppSingleton {
  private _axiosInstance:NuxtAxiosInstance = null;

  get $axios():NuxtAxiosInstance{
    return this._axiosInstance;
  }
  set $axios(instance:NuxtAxiosInstance){
    if(this._axiosInstance === null){
      this._axiosInstance = instance;
    }
  }


  openNewWindow(url: string, title: string, options: SubWindowOptions) {
    let features: string[] = [];

    if (options.fullsize === true) {
      options.width = window.screen.width;
      options.height = window.screen.height - 64;

    }
    if (options.width) {
      features.push(`width=${options.width}`);
    }
    if (options.height) {
      features.push(`height=${options.height}`);
    }


    if (options.centerscreen && !options.fullsize) {
      let left = window.screen.width / 2;
      let top = window.screen.height / 2;
      if (options.width) {
        left -= options.width / 2;
      }
      if (options.height) {
        top -= options.height / 2;
      }

      features.push("modal=yes");
      console.log("windowPosition:", [left, top]);
      features.push(`left=${left}`);
      features.push(`top=${top}`);
    }

    window.open(url, title, features.join(","));
  }
}
export const App = new WebAppSingleton();

export interface SubWindowOptions {
  fullsize?: boolean,
  width?: number,
  height?: number,
  centerscreen?: boolean
}
