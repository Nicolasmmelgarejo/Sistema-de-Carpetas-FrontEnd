import { User_Role } from "./user_role";

export class User{
    idUser?: number;
    userName?: string;
    userPassword?:string;
    user_Roles?: Array<User_Role>; 
};