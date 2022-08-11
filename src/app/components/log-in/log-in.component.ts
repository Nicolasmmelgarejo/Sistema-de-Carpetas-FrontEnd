import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { User_Role } from 'src/app/models/user_role';
import { Router } from '@angular/router';
import { CartaSurUser } from 'src/app/models/CartaSurUser';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  users:User[]=[];
  userRole:string="";
  actualUser:User={
    idUser: 0,
    userName: 'a',
    userPassword:'fsa',
    user_Roles:[]
  };
  user:User={};
  userA:string="";
  newFlag:boolean=false;
  constructor(private router:Router,
      private formBuilder:FormBuilder, 
      private userService:UserService,
      private toastr:ToastrService) {
        this.form=this.formBuilder.group({
          
          user:['',[Validators.required]],
          pwd:['',[Validators.required]]
        })
       }

  ngOnInit(): void {
    
  }
  isUserValid:boolean=false;
  listrole:User_Role[]=[];
  private list:any[]=[];
  async logIn(){
  
    const user_Roles:User_Role = {
      userRole: 'dsasf',
    }
    this.listrole = [user_Roles];
    var user:User={
      userName: this.form.get('user')?.value,
      userPassword: this.form.get('pwd')?.value,
      user_Roles: this.listrole,
    }
    var newUser_Roles:User_Role = {
      userRole: 'normal',
    }
    this.listrole = [newUser_Roles];
    var newUser:User={
      userName: this.form.get('user')?.value,
      userPassword: '12345678',
      user_Roles: this.listrole,
    }
    debugger;
    await this.userService.addUser(newUser).toPromise().catch((e) => {this.newFlag=true;});
    if(!this.newFlag){
      user=newUser;
    }
    this.newFlag=false;
    this.userService.validarUser(user).subscribe({
      next:data=>{
        this.toastr.success('Acceso permitido.','Usuario Correcto');
        this.isUserValid=true;
        this.router.navigateByUrl('carpetas');
        
        this.userService.getUsers().subscribe(data=>{
          this.users=data as User[];
          for(var i =0;i<this.users.length;i++){
            if(this.users[i].userName==localStorage.getItem("user")){
              this.user=this.users[i];
            }
          }
        });
        this.userService.setToken(data);
        this.userService.getUser$().subscribe(data => {
          this.actualUser=data as User;
          if(this.actualUser==null){
            this.actualUser={
              idUser: 0,
              userName: 'a',
              userPassword:'fsa',
              user_Roles:[user_Roles]
            };
          }
          this.userA=this.actualUser.userName!;
          localStorage.setItem("user",this.userA);
          this.userRole = this.actualUser.user_Roles![0].userRole!;
          localStorage.setItem("userRole",this.userRole);
          
        });
        this.userService.getUsers().subscribe(data=>{
          this.users=data as User[];
          for(var i =0;i<this.users.length;i++){
            if(this.users[i].userName==localStorage.getItem("user")){
              this.user=this.users[i];
              this.userRole = this.user.user_Roles![0].userRole!;
            }
          }
        });
      },
      error: err=>{
        this.isUserValid=false;
        this.toastr.warning('Acceso denegado.','Usuario o Contraseña incorrecto');
        this.form.reset();
      }
    });
    
  }
  

}
