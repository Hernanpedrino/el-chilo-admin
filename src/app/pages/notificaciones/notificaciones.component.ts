import { Component, OnInit } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { DatosService } from '../../services/datos.service';
import { User } from '../../interfaces/user.interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  public users:User[] = [];
  formNotification = new FormGroup({
      titulo: new FormControl(''),
      mensaje: new FormControl(''),
      categoria: new FormControl(''),
      usuarios: new FormArray([]),
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
    
  }
}
