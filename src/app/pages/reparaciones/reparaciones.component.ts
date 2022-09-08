import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { DatosService } from '../../services/datos.service';
import { NotificationsService } from './../../services/notificaciones.service';

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
  private idReparacion: string = '';
  private idDeviceCliente: string = '';

  formularioReparaciones = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    descripcionMaquinaAfilado: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    presupuesto: new FormControl(''),
  })

  formularioEdicion = new FormGroup({
    maquinaRepuesto: new FormControl(),
    descripcion: new FormControl(),
    presupuesto: new FormControl(),
    reparacionTerminada: new FormControl(),
  })
  
  constructor(private datosService: DatosService,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.reparaciones();
    this.getAllClients();
  }
  reparaciones(){
    this.datosService.getReparaciones().subscribe((resp:any)=>{
      let tempArr = []
      tempArr = resp.repairs;
      console.log(tempArr);
      const filtroRepActivas = tempArr.filter((active:any) => active.reparacionTerminada == false && active.tipoReparacion == 'reparacion');
      this.activeRepairs = filtroRepActivas;
      const filtroRepTerminadas = tempArr.filter((active:any) => active.reparacionTerminada == true && active.tipoReparacion == 'reparacion');
      this.finishedRepairs = filtroRepTerminadas;
      const filtroAfiladosActivos = tempArr.filter((active:any) => active.reparacionTerminada == false && active.tipoReparacion == 'afilado');
      this.afiladosActivos = filtroAfiladosActivos;
      const filtroAfiladosTerminados = tempArr.filter((active:any) => active.reparacionTerminada == true && active.tipoReparacion == 'afilado');
      this.afiladosTerminados = filtroAfiladosTerminados;
    });
  }
  editar(i:number){
    this.formularioEdicion.setValue({
      maquinaRepuesto: this.activeRepairs[i].descripcion,
      descripcion: this.activeRepairs[i].descripcionPresupuesto,
      presupuesto: this.activeRepairs[i].presupuesto,
      reparacionTerminada: this.activeRepairs[i].reparacionTerminada
    })
    this.edicion = true;
    this.nombre = this.activeRepairs[i].usuario.nombre;
    this.apellido = this.activeRepairs[i].usuario.apellido;
    this.fecha = this.activeRepairs[i].fechaRecepcion;
    this.idReparacion = this.activeRepairs[i]._id;
    this.idDeviceCliente = this.clientes[i].deviceId;
  }
  guardarActualizacion(){
    Swal.showLoading();
    const repairUpdate$ = this.datosService.updateRepair({
      repairId: this.idReparacion,
      descripcion: this.formularioEdicion.get('maquinaRepuesto')!.value,
      descripcionPresupuesto: this.formularioEdicion.get('descripcion')!.value,
      presupuesto: this.formularioEdicion.get('presupuesto')!.value,
      reparacionTerminada: this.formularioEdicion.get('reparacionTerminada')!.value,
    })
    const notify$ = this.notificationService.sendNotification(
      {
        deviceId: this.idDeviceCliente,
        titulo : 'Actualizacion en tu reparacion',
        mensaje: 'El estado de tu reparacion ha sido actualizado. Revisa la aplicacion para ver los cambios',
        categoria: 'reparacion'
      });
      combineLatest([repairUpdate$, notify$]).subscribe(resp =>{
        if (resp) {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Reparacion actualizada con exito'
          })
          this.reparaciones();
        }
      }, err =>{
        if (err) {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: 'Sucedio un error. Intente nuevamente'
          })
        }
      });
    this.edicion = false;
  }
  getAllClients(): void{
    this.datosService.getUsers()
    .pipe(
      pluck<Object, Client[]>('users'),
      map((resp:Client[])=>{
        this.clientes = resp;
      })
    ).subscribe()
  }
  datosFormulario(){
    const id = this.formularioReparaciones.get('cliente')!.value!;
    const descripcion = this.formularioReparaciones.get('descripcion')!.value!;
    const descripcionMaquinaAfilado = this.formularioReparaciones.get('descripcionMaquinaAfilado')!.value!;
    const categoria = this.formularioReparaciones.get('tipo')!.value!;
    const presupuesto = this.formularioReparaciones.get('presupuesto')!.value!;
    return {id, descripcion, categoria, presupuesto, descripcionMaquinaAfilado}
  }
  registrarReparacion(){
    Swal.showLoading();
    const valorPresupuesto = Number(this.datosFormulario().presupuesto);
    const catLowercase = this.datosFormulario().categoria.toLowerCase();
    let titulo;
    if (catLowercase === 'reparacion') {
      titulo = 'Reparacion registrada'
    } else {
      titulo = 'Afilado registrado'
    }
    const cliente = this.clientes.filter(cliente => cliente._id == this.datosFormulario().id);
    const deviceId = cliente[0].deviceId;
    const repair$ = this.datosService.newRepair(
      {
        userId: this.datosFormulario().id, 
        tipoReparacion: catLowercase, 
        detalleMaquinaAfilado: this.datosFormulario().descripcionMaquinaAfilado, 
        presupuesto: valorPresupuesto, 
        descripcionPresupuesto: this.datosFormulario().descripcion
      })
    const notifi$ = this.notificationService.sendNotification(
      {
        deviceId,
        titulo,
        mensaje: this.datosFormulario().descripcion,
        categoria: catLowercase
      });
    combineLatest([repair$, notifi$]).subscribe(resp =>{
      if (resp) {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Reparacion cargada con exito'
        })
        this.reparaciones();
      }
      this.formularioReparaciones.reset();
    }, err =>{
      if (err) {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: 'Sucedio un error. Intente nuevamente'
        })
      }
      this.formularioReparaciones.reset();
    });
  }
  cancelar(){
    this.edicion = false;
  }
}
