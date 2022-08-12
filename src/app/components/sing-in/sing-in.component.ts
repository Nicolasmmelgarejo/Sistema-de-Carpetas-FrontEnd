import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { User_Role } from 'src/app/models/user_role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {
  form: FormGroup;
  listrole: User_Role[]=[];
  userEdit:User={};
  flag:boolean=false;
  constructor(private router:Router,
      private formBuilder:FormBuilder, 
      private userService:UserService,
      private toastr:ToastrService) {
      this.form=this.formBuilder.group({
      Id:0,
      Nombre_User:['',[Validators.required]],
      pwd:['',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      ]],  
      rpwd:['',Validators.required], 
      User_Roles:['',[Validators.required]],
      
    })
  }
  

  ngOnInit(): void {
    this.userService.editUser$().subscribe(data=>{
      this.userEdit=data as User;
      if(this.userEdit!={}){
        this.flag=true;
      }
      this.form.patchValue({
        Nombre_User:this.userEdit.userName,
        pwd:this.userEdit.userPassword
      });
    });
  }
  addUser(){
    const user_Roles:User_Role = {
      userRole: this.form.get('User_Roles')?.value,
    }
    this.listrole = [user_Roles];
    const user:User={
      userName: this.form.get('Nombre_User')?.value,
      userPassword: this.form.get('pwd')?.value,
      user_Roles: this.listrole,
    }
    
    
    
    if(user.userPassword==this.form.get('rpwd')?.value){
      if(this.flag==true){
        user.idUser=this.userEdit.idUser;
        this.userService.editComplete(user.idUser!,user).subscribe({
          
            next:data=>{
              this.toastr.success('El Usuario fue Editado.','Ya esta en su ubicacion.');
              this.form.reset();
              this.router.navigateByUrl('verusuarios');
              this.flag==false;
              this.form.reset();
            },
            error: err=>{
              user.idUser=this.userEdit.idUser;
              this.userService.editComplete(user.idUser!,user).subscribe({
            
                next:data=>{
                  this.toastr.success('El Usuario fue Editado.','Ya esta en su ubicacion.');
                  this.form.reset();
                  this.router.navigateByUrl('verusuarios');
                  this.flag==false;
                  this.form.reset();
                },
                error: err=>{
                  this.toastr.warning('El Usuario no fue agregado.','El usuario ya existe.');
                  
                }
              });
            
            }
        });
      }else{
        this.userService.addUser(user).subscribe({

          next:data=>{
            this.toastr.success('El Usuario fue agregado.','Ya esta en su ubicacion.');
            this.form.reset();
          },
          error: err=>{
            this.toastr.warning('El Usuario no fue agregado.','El usuario ya existe.');
            this.form.reset();
            this.form.patchValue({
              Nombre_User:"",
            });
          }
        });
      }
      
    }else{
      this.toastr.warning('El Usuario no fue agregado.','Coloco mal las contraseñas.');
        this.form.patchValue({
          rpwd:""
        });
    }
    
    
  }
  verU(){
    this.router.navigateByUrl('verusuarios');
  }
}
