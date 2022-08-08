import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {

  public repairs: any[] = [];
  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.reparaciones();
  }
  reparaciones(){
    this.datosService.getReparaciones().subscribe((resp:any)=>{
      this.repairs = resp.repairs;
      console.log(this.repairs);
      
    });
    
  }

}
