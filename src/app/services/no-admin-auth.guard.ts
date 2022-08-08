import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAdminAuthGuard implements CanActivate {

  users:User[]=[];
  user:User={};

  constructor(private userService:UserService,
    private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userService.getUsers().subscribe(data=>{
        this.users=data as User[];
        for(var i =0;i<this.users.length;i++){
          if(this.users[i].userName==localStorage.getItem("user")){
            this.user=this.users[i];
          }
        }
      });
      if(this.user.user_Roles![0].userRole=='admin'){
        return true;
      }

    this.router.navigate(['carpetas']);
    return false;
  }
  
}
