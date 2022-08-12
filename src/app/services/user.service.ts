import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  myAppUrl='https://localhost:7056/'
  myApiUrl='api/User/'
  private editar = new BehaviorSubject<User>({}as any);
  private entre = new BehaviorSubject<any>({}as any);
  private nuevo = new BehaviorSubject<any>({}as any);
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  actualUser:User={};
  usuario:User[]=[];

  jwtHelperService = new JwtHelperService();
  
  constructor(private http:HttpClient) {}

  



  editComplete(id:number,user:User){
    return this.http.put(this.myAppUrl+this.myApiUrl+id,user,
      {
        responseType: 'text',
      },
    );
  }

  editUser(user:User){
    return this.editar.next(user);
  }
  editUser$():Observable<User>{
    return this.editar.asObservable();
  }

  addUser(user:User):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,user,
      {
        responseType: 'text',
      },
    );
  }
  
  getUsers():Observable<User>{
    return this.http.get<User>(this.myAppUrl+this.myApiUrl);
  }
  users:User[]=[];
  user:User={};
  userRole:string="";
  
  validarUser(user:User):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl+"validar",user,
      {
        responseType: 'text',
      },
    );
  }
  setToken(token:string){
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token  != null ? this.jwtHelperService.decodeToken(token) : null;
    
    this.getUsers().subscribe(data=>{
      this.usuario=data as User[];
      
      for(var i = 0;i<this.usuario.length;i++){
        if(this.usuario[i].userName==userInfo.UserName){
          this.actualUser = this.usuario[i];
        }
      }
      
      this.currentUser.next(this.actualUser);
    });

    
  }
  getUser$():Observable<User>{
    return this.currentUser.asObservable();
  }

  isLoggedin(): boolean{
    return localStorage.getItem("access_token") ? true : false;
  }

  removeToken(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  }
  deleteUser(id:number):Observable<User>{
    return this.http.delete<User>(this.myAppUrl+this.myApiUrl + id);
  }
  entro(number:number){
    this.entre.next(number);
  }
  entro$():Observable<any>{
    return this.entre.asObservable();
  }
  otro(number:number){
    this.nuevo.next(number);
  }
  otro$(){
    return this.nuevo.asObservable();
  }
  
}
