import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carperta } from '../models/carpeta';
import { Documento } from '../models/documento';


@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  myAppUrl='https://localhost:7056/'
  myApiUrl='api/Archivo/'
  list:any[]=[];
  constructor(private http:HttpClient) { }

  addDocumento(documento:Documento):Observable<Documento>{
    return this.http.post<Documento>(this.myAppUrl+this.myApiUrl,documento)
  }
  
  getDocumento(){
    return this.http.get(this.myAppUrl+this.myApiUrl).subscribe(data=>{
      this.list = data as Documento[];
      console.log(this.list);   
    });
  }
  getDocumentosO():Observable<Documento>{
    return this.http.get(this.myAppUrl+this.myApiUrl);
  }
  editArchivo(id:number,documento:Documento):Observable<Documento>{
    console.log(id,documento);
    return this.http.put<Documento>(this.myAppUrl+this.myApiUrl+id,documento);
    
  }
  deleteArchivo(id:number):Observable<Documento>{
    return this.http.delete<Documento>(this.myAppUrl+this.myApiUrl + id);
  }
}