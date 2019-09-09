import { Action, getModule, Module, Mutation, VuexModule } from "~/node_modules/vuex-module-decorators";
import { store } from "~/store";
import JwtDecode from 'jwt-decode';
import { App } from "~/core/App";
import { AxiosError } from "~/node_modules/axios";
import AppToast from "~/core/utils/AppToast";
import { Route } from "~/node_modules/vue-router";
import { User } from "~/core/models/user";


const ST_TOKEN_KEY = 'user_token';

export interface TokenPayload {
  iat: number;
  exp: number;
  data: User;
}

@Module({dynamic: true, store, name:'auth'})
class authStore extends VuexModule{
  //states
  // variables que se pueden acceder desde cualquier lugar pero de solo lectura.
  userToken:string = sessionStorage.getItem(ST_TOKEN_KEY);
  user: User = null;
  logged: boolean = !!sessionStorage.getItem(ST_TOKEN_KEY);
  returnUrl: Route = null;

  @Mutation
  public SET_RETURN_URL(route: Route | null) {
    this.returnUrl = route;
  }
  @Mutation
  private SET_USER(){
    console.log('SET Uer');
    const token = sessionStorage.getItem(ST_TOKEN_KEY);

    // SIMULATED LOGIN:
    if(token){
      this.user = {
        id: 102893,
        fullName: 'Matt Wickam',
        username: 'matt',
        email: 'example@mail.com',
        password:'******'
      };
      this.logged = true;
      this.userToken = token;
      return;
    }

    if (token != null) {
      try{
        const payload:TokenPayload = JwtDecode(token);
        if(payload && payload.data){
          this.user = payload.data;
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


  @Action
  public login({user, password}){
    return new Promise<User>((result, reject) => {
      // Simulated login:
      setTimeout(() => {
          sessionStorage.setItem(ST_TOKEN_KEY,'MY_TOKEN');
          this.SET_USER();
          result();
      },1000)

      // Real action
      // App.$axios.post(`/auth/login`,{user:user,password:password}).then(res => {
      //   const {token} = res.data;
      //   sessionStorage.setItem(ST_TOKEN_KEY,token);
      //   this.SET_USER();
      //   result();
      //
      // }).catch((err: AxiosError) => reject(err));
    });
  }

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
