import { Component, OnInit } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { DatosService } from '../../services/datos.service';
import { User } from '../../interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  public check = false;
  public users:User[] = [];
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
      pluck<Object, User[]>('users'),
      map((resp:User[])=>{
        this.users = resp;
      })
    ).subscribe()
  }
  enviarNotificacion(){
   console.log(this.formNotification.value);
   console.log(this.devices);
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
