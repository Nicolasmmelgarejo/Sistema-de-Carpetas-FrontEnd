import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vistausuarios',
  templateUrl: './vistausuarios.component.html',
  styleUrls: ['./vistausuarios.component.css']
})
export class VistausuariosComponent implements OnInit {
  userList:User[]=[];
  flag:boolean=false;
  constructor(public router:Router,
              public userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>{
      const fuserList=data as User[];
      this.userList = fuserList.filter((item) => item.userName !== localStorage.getItem("user"));
    });
  }
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(data=>{
      this.userService.getUsers().subscribe(data=>{
        const fuserList=data as User[];
        this.userList = fuserList.filter((item) => item.userName !== localStorage.getItem("user"));
        
      });
    });
  }
  editUser(user:User){
    this.router.navigateByUrl('singin');
    this.userService.editUser(user);
  }

  crearU(){
    this.router.navigateByUrl('singin');
  }
}
