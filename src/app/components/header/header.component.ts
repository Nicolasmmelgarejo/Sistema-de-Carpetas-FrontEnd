import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  actualUser:User={};
  users:User[]=[];
  user:User={};
  constructor(private router:Router,
              private userService:UserService) { }
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>{
      this.users=data as User[];
      for(var i =0;i<this.users.length;i++){
        if(this.users[i].userName==localStorage.getItem("user")){
          this.user=this.users[i];
        }
      }
    });
    this.userService.getUser$().subscribe(data => {
      this.actualUser=data as User;
      localStorage.setItem("user",this.actualUser.userName!);
      console.log(this.actualUser);
    });
    const user = localStorage.getItem("user");
    this.userService.getUsers().subscribe(data=>{
      this.userService.usuario=data as User[];
      console.log(this.userService.usuario);
      for(var i = 0;i<this.userService.usuario.length;i++){
        if(this.userService.usuario[i].userName==user){
          this.actualUser = this.userService.usuario[i];
        }
      }
    });
  }
  backLogin(){
    this.userService.removeToken();
    this.router.navigateByUrl('login');
  }
  crearC(){
    this.router.navigateByUrl('crear-carpeta');
  }
  crearU(){
    this.router.navigateByUrl('singin');
  }
  crearA(){
    this.router.navigateByUrl('crear-documento');
  }
  verC(){
    this.router.navigateByUrl('carpetas');
  }
  
  verU(){
    this.router.navigateByUrl('verusuarios');
  }
}
