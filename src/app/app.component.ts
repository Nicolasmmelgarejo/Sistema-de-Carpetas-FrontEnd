import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(public userService:UserService) {}
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
  }
  
}
