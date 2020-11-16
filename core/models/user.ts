import {UserType} from "~/core/enums/UserType";

export interface User {
  id?:number;
  name?:string;
  email?:string,
  username?:string;

  rol?:UserType;
  password?:string;
}
