import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "~/node_modules/axios";

declare module "*.vue" {
  import Vue from "vue";

  const _default: Vue;
  export default _default;
}
interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  $get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
}
