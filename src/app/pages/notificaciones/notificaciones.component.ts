import { Component, OnInit } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { DatosService } from '../../services/datos.service';
import { Client } from '../../interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  public check = false;
  public users:Client[] = [];
  public devices:string[] = []
  formNotification = new FormGroup({
      titulo: new FormControl(''),
      mensaje: new FormControl(''),
      categoria: new FormControl(''),
      usuarios: new FormControl(),
      selTodos: new FormControl(),
  });
  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.datosService.getUsuarios()
    .pipe(
      pluck<Object, Client[]>('users'),
      map((resp:Client[])=>{
        this.users = resp;
      })
    ).subscribe()
  }
  enviarNotificacion(){
    const titulo = this.formNotification.get('titulo')!.value;
    const categoria = this.formNotification.get('categoria')!.value;
    const mensaje = this.formNotification.get('mensaje')!.value;
    this.datosService.sendGroupNotification(titulo!, mensaje!, categoria!, this.devices)
    .subscribe(resp =>{
      if (resp) {
        Swal.fire({
          title:'Notificaciones enviadas',
          icon: 'success'
        });
        this.formNotification.reset();
      }
    }, err =>{
      if (err) {
        Swal.fire({
          title:'Sucedio un error',
          text: 'Ocurrio un error al enviar las notificaciones. Intente nuevamente.',
          icon: 'error'
        })
      }
    })
    
  }
  onChange(deviceId:string, event: EventTarget | null){
    const input = event as HTMLInputElement;
    if (input.checked) {
      this.devices.push(deviceId);
    } else {
      let index = this.devices.indexOf(deviceId);
      this.devices.splice(index,1);
    }
  }
  seleccionarTodos(){
    if (this.formNotification.controls['selTodos'].value) {
      this.check = true;
      this.users.forEach(user => {
        this.devices.push(user.deviceId);
      });
    } else {
      this.check = false
      this.devices = [];
    }
    
  }
}
