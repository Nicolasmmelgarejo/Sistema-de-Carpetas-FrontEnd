import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Carperta } from 'src/app/models/carpeta';
import { Documento } from 'src/app/models/documento';
import { TablaCarpetas } from 'src/app/models/tablacarpetas';
import { CarpetaService } from 'src/app/services/carpeta.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-archivo',
  templateUrl: './editar-archivo.component.html',
  styleUrls: ['./editar-archivo.component.css']
})
export class EditarArchivoComponent implements OnInit {
  form: FormGroup;
  listdoc: Documento[]=[];
  listtabla: TablaCarpetas[]=[];
  list:Documento={};
  id:number=0;
  archivo:string="";
  constructor(private formBuilder:FormBuilder,
    public documentoService:DocumentoService,
    public carpetaService:CarpetaService,
    private toastr:ToastrService, public router:Router) {
      this.form=this.formBuilder.group({
        Id:0,
        nombreArchivo:['',[Validators.required,
        Validators.maxLength(15)]],
        contenidoArchivo:['',[Validators.required]],
     })
    }

  ngOnInit(): void {
    this.carpetaService.getCarpetas$().subscribe(datos =>{   
      this.list = datos as Documento;
      this.archivo = '\n'+this.list.contenidoArchivo!;
      
      this.form.patchValue({
        nombreArchivo:this.list.nombreArchivo,
        contenidoArchivo: this.archivo
      });
    });

  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    sanitize: false,
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };
  editArchivo(){
    const archivo:Documento ={
        id: this.list.id,
        nombreArchivo: this.form.get('nombreArchivo')?.value,    
        contenidoArchivo: this.form.get('contenidoArchivo')?.value,
        carpetaId: this.list.carpetaId, 
    }
    
    this.documentoService.editArchivo( this.list.id!,archivo).subscribe(data=>{
      this.carpetaService.traerCont(1);
      this.carpetaService.traer(archivo);
      this.toastr.success('Se a editado.','Se edito correctamente.');
      this.carpetaService.switch(2);
    });

  }
}
