import { AuthStore } from "~/store/modules/AuthStore";

export default function ({ store, route, redirect }) {
  AuthStore.checkLogin();

  if (!AuthStore.logged) {
    AuthStore.SET_RETURN_URL({ ...route });
    return redirect('/login')
  }
  console.log('User logged');
  // Authentication with user levels:
  // const authorizationLevels = route.meta.map((meta) => {
  //   if (meta.auth && typeof meta.auth.levelUser !== 'undefined')
  //     return meta.auth.levelUser;
  //   return 0
  // });
}
