import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DatosService } from '../../services/datos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-listas-precios',
  templateUrl: './listas-precios.component.html',
  styleUrls: ['./listas-precios.component.css']
})
export class ListasPreciosComponent implements OnInit {

  public listas: any[] = [];
  public archivo:any;
  listasForm = new FormGroup({
    categoria: new FormControl('', Validators.required)
  })
  @ViewChild('impFile') impFile: ElementRef | undefined;
  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.cargarListas();
  }
  cargarListas(){
    const token = localStorage.getItem('token');
    this.datosService.getLists(token!).subscribe(resp=>{
      resp.forEach(list => {
        this.listas.push(list);
      });
    })
  }
  subirLista(){
    this.listas = [];
    const categoria = this.listasForm.get('categoria')?.value;
    this.datosService.uploadLista(categoria! , this.archivo!)
    .subscribe(
      resp=>{
        Swal.fire({
          title:'Lista cargada correctamente',
          icon: 'success'
        })
        this.listasForm.reset();
        this.impFile!.nativeElement.value = null;
        this.cargarListas();
      }, 
      err=>{
        Swal.fire({
          title:'Error al cargar la lista',
          text: `${err}`,
          icon: 'error'
        })
      })
  }
  subir(file:File){
    this.archivo = file;
  }
  // TODO: Implementar la forma de cancelar la subida de archivo
}
