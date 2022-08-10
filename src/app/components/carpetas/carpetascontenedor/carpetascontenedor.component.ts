import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { Documento } from 'src/app/models/documento';
import { CarpetaService } from 'src/app/services/carpeta.service';

@Component({
  selector: 'app-carpetascontenedor',
  templateUrl: './carpetascontenedor.component.html',
  styleUrls: ['./carpetascontenedor.component.css']
})
export class CarpetascontenedorComponent implements OnInit {
  list:Documento={};
  archivo:string="";
  htmlYouWantToAdd="";
  constructor(public carpetaService:CarpetaService) { }

  ngOnInit(): void {
    this.carpetaService.getCarpetas$().subscribe(datos =>{
      this.list = datos as Documento;
      this.archivo = '\n'+this.list.contenidoArchivo!;
      let myContainer = document.getElementById('cont') as HTMLInputElement;
      console.log(this.archivo);
      try{
        myContainer.innerHTML= this.archivo;
      }catch(e){
        console.log("Ok");
      }
      
    });
  }  
}
