import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {

  public activeRepairs: any[] = [];
  public finishedRepairs: any[] = [];
  public afiladosActivos: any[] = [];
  public afiladosTerminados: any[] = [];
  public edicion: boolean = false;
  public nombre: string | undefined;
  public apellido: string | undefined;
  public fecha: Date | undefined;


  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.reparaciones();
  }
  reparaciones(){
    this.datosService.getReparaciones().subscribe((resp:any)=>{
      console.log(resp);
      
      let tempArr = []
      tempArr = resp.repairs;
      const filtroRepActivas = tempArr.filter((active:any) => active.reparacionTerminada == false && active.reparacion == 'reparacion');
      this.activeRepairs = filtroRepActivas;
      const filtroRepTerminadas = tempArr.filter((active:any) => active.reparacionTerminada == true && active.reparacion == 'reparacion');
      this.finishedRepairs = filtroRepTerminadas;
      const filtroAfiladosActivos = tempArr.filter((active:any) => active.reparacionTerminada == false && active.reparacion == 'afilado');
      this.afiladosActivos = filtroAfiladosActivos;
      const filtroAfiladosTerminados = tempArr.filter((active:any) => active.reparacionTerminada == true && active.reparacion == 'afilado');
      this.afiladosTerminados = filtroAfiladosTerminados;
    });
  }
  editar(i:number){
    console.log(this.activeRepairs[i]);
    this.edicion = true;
    this.nombre = this.activeRepairs[i].usuario.nombre;
    this.apellido = this.activeRepairs[i].usuario.apellido;
    this.fecha = this.activeRepairs[i].fechaRecepcion;
    
  }
  
}
