import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  loginUser(email:string, password:string):Observable<Object>{
    const body = {
      email: email,
      password: password
    }
    return this.http.post(
      `${environment.baseUrl}/auth/login`,
      body
    );
  }
  checkUserId(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';
    return this.http.get(`${environment.baseUrl}/usuarios/${userId}`,
    {headers:{'x-token': token}}
    ).pipe(
      map((resp:any)=>{return true;}),
      catchError(err => of(false))
    )
  }

  getUsuarios(): Observable<Object>{
    const token = localStorage.getItem('token');
    return this.http.get(`${environment.baseUrl}/usuarios`,{headers:{'x-token': token!}})
  }
}
