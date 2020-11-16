import {Action, getModule, Module, Mutation, VuexModule} from "~/node_modules/vuex-module-decorators";
import {store} from "~/store";
import JwtDecode from "jwt-decode";
// with ts we can do it:
//import jwtDecode, { JwtPayload } from "jwt-decode";

import {Route} from "~/node_modules/vue-router";
import {User} from "~/core/models/user";
import {App} from "~/core/App";
import {ApiResponse} from "~/core/api/ApiResponse";
import {UserType} from "~/core/enums/UserType";

const ST_TOKEN_KEY = 'user_token';
const ST_USER_KEY = 'user';

export enum LoginErrors {
  DATOS_INCORRECTOS,
  ERROR_AL_OBTENER_DATOS,
  ERROR_RED
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}

/**
 * Contenido del token
 */
export interface TokenPayload {
  aud: string;
  jti: string;
  iat: number;
  nbf: number;
  exp: number;
  sub: string;
  scopes: any[];
}


@Module({dynamic: true, store, name:'auth', namespaced: true,
  stateFactory: true})
class authStore extends VuexModule{
  //states
  // variables que se pueden acceder desde cualquier lugar pero de solo lectura.
  userToken:string = sessionStorage.getItem(ST_TOKEN_KEY);
  user: User = null;
  operadorRH:User=null;
  operadorEconomia:User=null;
  /***
   * Indica si el usuario esta logeado
   */
  logged: boolean = !!sessionStorage.getItem(ST_TOKEN_KEY);
  /**
   * Es la url a la que se deve voler
   */
  returnUrl: Route = null;
  loginError:boolean | LoginErrors = false;


  get isAdmin():boolean{
    return this.logged &&
      this.user &&
      this.user.rol === UserType.ADMIN;
  }
  get isRootUser():boolean{
    return this.logged && this.user && this.user.rol === UserType.ROOT;
  }
  get isBasicUser():boolean{
    return this.logged && this.user && this.user.rol === UserType.BASIC;
  }
  get isGuest():boolean{
    return !this.logged;
  }


  @Mutation
  public SET_RETURN_URL(route: Route | null) {
    this.returnUrl = route;
  }
  @Mutation
  private SET_USER(){
    //guarda el token
    const token = sessionStorage.getItem(ST_TOKEN_KEY);

    if (token != null) {

      try{
        const payload:TokenPayload = JwtDecode(token);
        // const decoded = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
        if(payload){
          //guarda el user en json
          const userjson = sessionStorage.getItem(ST_USER_KEY);
          //trasforma el formato del user
          const userdata:any = JSON.parse(userjson);

          this.user = userdata.user;

          this.logged = true;
          this.userToken = token;
          return; // RETURN ON OK
        }
      }catch (e) {
        console.warn('Token invalid');
      }
    }

    this.user = null;
    this.logged = false;
    this.userToken = null;
  }
  @Mutation
  public SET_LOGGED(val:boolean){
    this.logged = val;
  }

  @Mutation
  private SET_LOGIN_ERROR(err:boolean|LoginErrors){
    this.loginError = err;
  }



  @Action
  public login({user, password}){
    return new Promise<User>(async (result, reject) => {
      // Real action
      //Desactivamos el mensaje de error al hacer el login
      let config:any = {errorHandler:false};
      try {
        let res1 = await App.$axios.$post<LoginResponse>(`/auth/login`, { user: user, password: password }, config);
        const token = res1.access_token;
        sessionStorage.setItem(ST_TOKEN_KEY, token);

        let res2 = await App.$axios.$get<ApiResponse>(`/users/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const user2 = res2.data;
        //trasforma el objeto a tipo json
        const json = JSON.stringify(user2);
        sessionStorage.setItem(ST_USER_KEY, json);
        this.SET_USER();
        result();
      } catch (e) {
        reject(e)
      }

    });
  }

  /***
   * Elimina los datos de la sesion.
   * NO REDIRECCIONA
   */
  @Action
  public logout(){
    sessionStorage.clear();
    this.SET_USER();
  }

  @Action
  public checkLogin(){

    this.SET_USER();
  }
}

export const AuthStore = getModule(authStore);
