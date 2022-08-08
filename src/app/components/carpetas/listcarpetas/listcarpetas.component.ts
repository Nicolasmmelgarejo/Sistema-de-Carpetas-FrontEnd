import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Carperta } from 'src/app/models/carpeta';
import { TablaCarpetas } from 'src/app/models/tablacarpetas';
import { CarpetaService } from 'src/app/services/carpeta.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { TableService } from 'src/app/services/table.service';
import { Documento } from 'src/app/models/documento';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-listcarpetas',
  templateUrl: './listcarpetas.component.html',
  styleUrls: ['./listcarpetas.component.css']
})
export class ListcarpetasComponent implements OnInit {
  users:User[]=[];
  user:User={};
  htmlTxtArray:String[]=[];
  htmlTxt:string='';
  constructor(public carpetaService:CarpetaService,
              public tablaServices:TableService,
              public documentoService:DocumentoService,
              public toastr: ToastrService,
              public router:Router,
              public userService:UserService) { }

  

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>{
      this.users=data as User[];
      for(var i =0;i<this.users.length;i++){
        if(this.users[i].userName==localStorage.getItem("user")){
          this.user=this.users[i]
        }
      }
    });
    this.carpetaService.getCarpetasnuevo$().subscribe(()=>{
      this.carpetaService.carpetasFiltradas=[];
      this.carpetaService.listCarpetas=[];
      this.carpetaService.getCarpetasO();
    });
  }
  mostarAr(archivo:Documento){
    this.carpetaService.traer(archivo);
    this.carpetaService.switch(2);
    console.log("entre");
  }
  editArchivo(archivo:Documento){
    this.carpetaService.traer(archivo);
    this.carpetaService.switch(1);
    
  }
  deleteObject(id:number){
    if(confirm('Quiere Elimidar el objeto?')){
      this.carpetaService.deleteObject(id).subscribe(data =>{
        this.toastr.warning('A elimidano el objeto','El Obsjeto fue Eliminado');
        this.carpetaService.getCarpetasnuevo$().subscribe(()=>{
          this.carpetaService.carpetasFiltradas=[];
          this.carpetaService.listCarpetas=[];
          this.carpetaService.getCarpetasO();
        })
      });
    }
  }
  
  editCar(carpeta:Carperta){
    this.carpetaService.carpetaed(carpeta);
    this.router.navigateByUrl('editCar');
  }



  deleteAr(id:number){
    this.documentoService.deleteArchivo(id).subscribe(()=>{
      this.carpetaService.switch(0);
      this.carpetaService.carpetasFiltradas=[];
      this.carpetaService.listCarpetas=[];
      this.carpetaService.getCarpetasO();
    });
  }
}
