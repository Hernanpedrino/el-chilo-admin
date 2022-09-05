import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { Client } from '../../interfaces/user.interface';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public users:Client[] = [];
  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.getAllClients()
  }
  getAllClients(): void{
    this.datosService.getUsuarios()
    .pipe(
      pluck<Object, Client[]>('users'),
      map((resp:Client[])=>{
        this.users = resp;
      })
    ).subscribe()
  }

}
