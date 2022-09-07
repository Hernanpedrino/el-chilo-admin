import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  sendGroupNotification({ titulo, mensaje, categoria, devices }: { titulo: string; mensaje: string; categoria: string; devices: string[]; }): Observable<Object>{
    return this.http.post(
      `${environment.baseUrl}/notificaciones/group-notification`,
      {titulo, mensaje, categoria, devices})
  }
  sendNotification({ deviceId, titulo, mensaje, categoria }: { deviceId: string; titulo: string; mensaje: string; categoria: string; }): Observable<Object>{
    return this.http.post(
      `${environment.baseUrl}/notificaciones/personal-notification/${deviceId}`,
      {titulo, mensaje, categoria}
    )
  }
}
