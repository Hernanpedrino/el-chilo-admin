import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { User } from '../interfaces/user.interface';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public users:User[] = [];
  constructor(private datosService: DatosService) { }

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

}
