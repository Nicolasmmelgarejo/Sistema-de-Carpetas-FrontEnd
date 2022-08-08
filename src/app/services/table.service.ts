import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TablaCarpetas } from '../models/tablacarpetas';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  myAppUrl='https://localhost:7056/'
  myApiUrl='api/TablaCarpetas/'
  list:any[]=[];
  constructor(private http:HttpClient) { }

  getTabla():Observable<TablaCarpetas>{
    return this.http.get(this.myAppUrl+this.myApiUrl)
  }
}
