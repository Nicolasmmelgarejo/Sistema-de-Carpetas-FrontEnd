import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carperta } from '../models/carpeta';
import { Documento } from '../models/documento';
import { TablaCarpetas } from '../models/tablacarpetas';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {
  myAppUrl='https://localhost:7056/'
  myApiUrl='api/Carpeta/'
  list:any[]=[];
  
  constructor(private http:HttpClient,public tablaServices:TableService) { }
  private datos = new BehaviorSubject<Documento>({}as any);
  private numero = new BehaviorSubject<number>({}as any);
  private numerocar = new BehaviorSubject<number>({}as any);
  private carpeta = new BehaviorSubject<Carperta>({}as any);
  addCarpeta(carpeta:Carperta):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,carpeta,
        {
          responseType: 'text',
        },
      );
  }
  listTabla:any[]=[];
  tablaFiltrada:any[]=[];
  listCarpetas:any[]=[];
  otra:any[]=[];
  listArchivos:any[]=[];
  carpetasFiltradas:any[]=[];
  getCarpetas(){
    return this.http.get(this.myAppUrl+this.myApiUrl).subscribe(data=>{
      this.list = data as Carperta[]; 
    });
  }
  carpetas:Carperta[]=[];


  getCarpetasO(){
    return this.http.get(this.myAppUrl+this.myApiUrl).subscribe(data=>{
      this.listCarpetas =data as Carperta[];
      console.log(this.listCarpetas);

      this.tablaServices.getTabla().subscribe(data=>{
        this.listTabla = data as TablaCarpetas[];
        this.tablaFiltrada= this.listTabla.filter((items) => items.nombreCarpeta == "principal");
        console.log(this.listCarpetas);
        console.log(this.tablaFiltrada);
        this.carpetasFiltradas=[];
        for(var i =0;i<this.tablaFiltrada.length;i++){
          for(var j =0;j<this.listCarpetas.length;j++){
            if(this.tablaFiltrada[i].carpetaId==this.listCarpetas[j].id){
              this.carpetasFiltradas.push(this.listCarpetas[j]);
            }
          }
        }
        console.log(this.carpetasFiltradas);
      });
    });
  }
  carpetaEdit(id:number,carpeta:Carperta):Observable<Carperta>{
    console.log(id,carpeta);
    return this.http.put<Carperta>(this.myAppUrl+this.myApiUrl+id,carpeta);
  }
  traer(archivo:Documento){
    this.datos.next(archivo);
  }
  getCarpetas$():Observable<Carperta>{
    return this.datos.asObservable();
  }
  deleteObject(id:number):Observable<Carperta>{
    return this.http.delete<Carperta>(this.myAppUrl+this.myApiUrl + id);
  }
  switch(number:number){
    return this.numero.next(number);
  }
  switch$():Observable<number>{
    return this.numero.asObservable();
  }
  traerCont(number:number){
    this.numerocar.next(number);
  }
  getCarpetasnuevo$():Observable<number>{
    return this.numerocar.asObservable();
  }
  carpetaed(carpeta:Carperta){
    return this.carpeta.next(carpeta);
  }
  carpetaed$():Observable<Carperta>{
    return this.carpeta.asObservable();
  }

}
