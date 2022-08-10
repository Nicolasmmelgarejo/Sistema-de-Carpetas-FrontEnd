import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Carperta } from 'src/app/models/carpeta';
import { Documento } from 'src/app/models/documento';
import { TablaCarpetas } from 'src/app/models/tablacarpetas';
import { CarpetaService } from 'src/app/services/carpeta.service';

@Component({
  selector: 'app-crearcarpeta',
  templateUrl: './crearcarpeta.component.html',
  styleUrls: ['./crearcarpeta.component.css']
})
export class CrearcarpetaComponent implements OnInit {

  form: FormGroup;
  listdoc: Documento[]=[];
  listtabla: TablaCarpetas[]=[];
  list: any[]=[];
  constructor(private formBuilder:FormBuilder, 
      public carpetaService:CarpetaService,
      private toastr:ToastrService) {
      this.form=this.formBuilder.group({
      Id:0,
      nobre_carpeta:['',[Validators.required,
      Validators.maxLength(15)]],
      carpeta_contenerdora:['',[Validators.required]],  
      
      
    })
  }
  carpetas:Carperta[]=[];
  ngOnInit(): void {
    this.carpetaService.getCarpetasO();
  }
  addCarpeta(){
    const document:Documento = {
      nombreArchivo: 'vacio',
      contenidoArchivo:'vacio',
    }
    const tablaCarpetas:TablaCarpetas = {
      nombreCarpeta: this.form.get('carpeta_contenerdora')?.value,
    }
    
    this.listdoc = [document];
    this.listtabla=[tablaCarpetas];
    const carpeta:Carperta={
      nombreCarpeta: this.form.get('nobre_carpeta')?.value,    
      archivos: this.listdoc,
      tablaCarpetas: this.listtabla,
    }
    
  
      this.carpetaService.addCarpeta(carpeta).subscribe(
        {
        next:data=>{
          this.toastr.success('La Carpeta fue agregada.','Ya esta en su ubicacion.');
          this.carpetaService.getCarpetasO();
          this.form.reset();
        },
        error: err=>{
          this.toastr.warning('La carpeta no fue agregado.','Ya existe una carpeta con ese nombre.');
          this.form.patchValue({
            nobre_carpeta:'',
          });
        }
      });
  } 
}