import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { User_Role } from 'src/app/models/user_role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  actualUser:User={
    idUser: 0,
    userName: 'a',
    userPassword:'fsa',
    user_Roles:[]
  };
  users:User[]=[];
  user:User={};
  userRole:string="";
  userA:string="";
  constructor(public router:Router,
              public userService:UserService) { }
  
  ngOnInit(): void {
    this.userService.otro$().subscribe(data => {
      this.userService.getUsers().subscribe(data=>{
        this.users=data as User[];
        for(var i =0;i<this.users.length;i++){
          if(this.users[i].userName==localStorage.getItem("user")){
            this.user=this.users[i];
            this.userRole = this.user.user_Roles![0].userRole!;
          }
        }
        const user = localStorage.getItem("user");
        this.userService.getUsers().subscribe(data=>{
          this.userService.usuario=data as User[];
          
          for(var i = 0;i<this.userService.usuario.length;i++){
            if(this.userService.usuario[i].userName==user){
              this.actualUser = this.userService.usuario[i];
              this.userA=this.actualUser.userName!;
              this.userRole = this.actualUser.user_Roles![0].userRole!;
              localStorage.setItem("userRole",this.userRole);
            }
          }
        });
      });
    });
    this.userService.getUsers().subscribe(data=>{
      this.users=data as User[];
      for(var i =0;i<this.users.length;i++){
        if(this.users[i].userName==localStorage.getItem("user")){
          this.user=this.users[i];
          this.userRole = this.user.user_Roles![0].userRole!;
        }
      }
      const user = localStorage.getItem("user");
      this.userService.getUsers().subscribe(data=>{
        this.userService.usuario=data as User[];
        
        for(var i = 0;i<this.userService.usuario.length;i++){
          if(this.userService.usuario[i].userName==user){
            this.actualUser = this.userService.usuario[i];
            this.userA=this.actualUser.userName!;
            this.userRole = this.actualUser.user_Roles![0].userRole!;
            localStorage.setItem("userRole",this.userRole);
          }
        }
      });
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
