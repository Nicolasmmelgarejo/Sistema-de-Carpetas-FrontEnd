import { Component, OnInit } from '@angular/core';
import { Carperta } from 'src/app/models/carpeta';
import { CarpetaService } from 'src/app/services/carpeta.service';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/models/documento';
import { TablaCarpetas } from 'src/app/models/tablacarpetas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  form: FormGroup;
  listdoc: Documento[]=[];
  listtabla: TablaCarpetas[]=[];
  list: any[]=[];
  constructor(public carpetaService:CarpetaService,
    private formBuilder:FormBuilder,
      private toastr:ToastrService,
      public router:Router) {
        this.form=this.formBuilder.group({
          Id:0,
          nobre_carpeta:['',[Validators.required,
            Validators.maxLength(15)]],
        })
       }
  carpetaname:Carperta={};
  ngOnInit(): void {
    this.carpetaService.carpetaed$().subscribe(datos =>{   
      this.carpetaname = datos as Carperta;
      
      this.form.patchValue({
        nobre_carpeta: this.carpetaname.nombreCarpeta
      });
    });
  }
  editCarpeta(){
    
    const document:Documento = {
      nombreArchivo: "vacio",
      contenidoArchivo:"vacio",
    }
    const tablaCarpetas:TablaCarpetas = {
      nombreCarpeta: "vacio",
    }
    
    this.listdoc = [document];
    this.listtabla=[tablaCarpetas];
    const carpeta:Carperta={
      id: this.carpetaname.id,
      nombreCarpeta: this.form.get('nobre_carpeta')?.value,    
      archivos: this.listdoc,
      tablaCarpetas: this.listtabla,
    }
    this.carpetaService.carpetaEdit(carpeta.id!,carpeta).subscribe(cata=>{
      this.toastr.success('Se a editado.','Se edito correctamente.');
      this.router.navigateByUrl('carpetas');
    });
  }
}
