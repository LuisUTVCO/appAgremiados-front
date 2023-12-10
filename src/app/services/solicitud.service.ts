import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getVersolicitud(): Observable<any> {
    return this.http.get<any>(this.url + '/obtenerSolicitud');
  }

  agregarSolicitud(datosNuevoSolicitud: any) {
    return this.http.post(`${this.url}/agregarsolicitud`, datosNuevoSolicitud);
  }

  dowlandArchivo(rutaArchivo: string): Observable<ArrayBuffer> {
    const url = `${URL}/dowlandArchivo/${(rutaArchivo)}`;
    return this.http.get(url, { responseType: 'arraybuffer' })
  }
}