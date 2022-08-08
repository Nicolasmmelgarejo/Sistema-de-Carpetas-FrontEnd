import { Component, OnInit } from '@angular/core';
import { CarpetaService } from 'src/app/services/carpeta.service';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrls: ['./carpetas.component.css']
})
export class CarpetasComponent implements OnInit {

  constructor(public carpetaService:CarpetaService) { }
  numero:number=0;
  ngOnInit(): void {
     this.carpetaService.switch$().subscribe(data=>{
      this.numero=data as number;
      console.log(this.numero);
     });
  }

}
