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
    
  }
  
}
