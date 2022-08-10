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
  userRole:string="";
  constructor(private userService:UserService,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
      
      if(localStorage.getItem("userRole")=='admin'){
        return true;
      }
    
    this.router.navigate(['carpetas']);
    return false;
  }
}
