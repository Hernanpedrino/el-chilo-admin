import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../pages/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Object>{
    return this.http.get(`${environment.baseUrl}/usuarios`,{headers:{'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1YThjZmNiYTYzNDBjYWFhZTlhMjIiLCJyb2xlIjoibWFuYWdlciIsImVtYWlsIjoibWFpbEBtYWlsLmNvbSIsImlhdCI6MTY1NzEwNDA0MSwiZXhwIjoxNjU3MTQ3MjQxfQ.kbdX_eJw8y0Mnv57dEXh9UhtuFNKDy-kDaSR4ii--3M'}})
  }
}
