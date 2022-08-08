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


@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  form: FormGroup;
  listdoc: Documento[]=[];
  listtabla: TablaCarpetas[]=[];
  list: any[]=[];
  
  constructor(private formBuilder:FormBuilder,
      public documentoService:DocumentoService,
      public carpetaService:CarpetaService,
      private toastr:ToastrService,
      ) {
      this.form=this.formBuilder.group({
      Id:0,
      nombreArchivo:['',[Validators.required,
      Validators.maxLength(15)]],
      contenidoArchivo:['',[Validators.required]],  
      carpetaId:['',[Validators.required]],
    })
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
  
  ngOnInit(): void {
    
    this.carpetaService.getCarpetas();
    
    this.carpetaService.traerCont(1);
  }
  
  addArchivo(){
    const documento:Documento={
      nombreArchivo: this.form.get('nombreArchivo')?.value,    
      contenidoArchivo: this.form.get('contenidoArchivo')?.value,
      carpetaId: this.form.get('carpetaId')?.value, 
    }
    console.log(documento);
      this.documentoService.addDocumento(documento).subscribe(data=>{
      this.toastr.success('El Archivo fue agregado.','Ya esta en su ubicacion.');
      this.carpetaService.getCarpetas();
      this.carpetaService.traerCont(1);
      this.form.reset();
    });
  }

}