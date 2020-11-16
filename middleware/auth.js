import {AuthStore} from "~/store/AuthStore";

export default function ({ store, route, redirect }) {


  if(AuthStore.logged){
    console.log('no esta logeado!');
    return redirect('/login');
  }


}
