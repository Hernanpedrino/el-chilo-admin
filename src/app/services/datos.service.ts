import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Object>{
    return this.http.get(`${environment.baseUrl}/usuarios`,{headers:{'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1YThjZmNiYTYzNDBjYWFhZTlhMjIiLCJyb2xlIjoibWFuYWdlciIsImVtYWlsIjoibWFpbEBtYWlsLmNvbSIsImlhdCI6MTY1NzIwMDA0NiwiZXhwIjoxNjU3MjQzMjQ2fQ.BOcU1FYgcAUbHLZhUfUDu_vM2BOMY8J9yt3HTeROoLQ'}})
  }
  // TODO: Cambiar el valor del token dinamicamente al hacer login
}
