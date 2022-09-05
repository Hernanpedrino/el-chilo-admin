import { Component, OnInit } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/user.interface';
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


  public clientes:Client[] = [];
  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.reparaciones();
    this.getAllClients();
  }
  reparaciones(){
    this.datosService.getReparaciones().subscribe((resp:any)=>{
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
  getAllClients(): void{
    this.datosService.getUsuarios()
    .pipe(
      pluck<Object, Client[]>('users'),
      map((resp:Client[])=>{
        this.clientes = resp;
      })
    ).subscribe()
  }
  
}
