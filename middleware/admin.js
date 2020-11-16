import {AuthStore} from "~/store/AuthStore";

export default function ({ store, route, redirect }) {

  console.log("Middleware 2");
  if(!AuthStore.logged || !AuthStore.isAdmin){
    console.log('no es un admin!');
    return redirect('/');
  }



}
