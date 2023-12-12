import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgremiadoService {

  // URL de la Base de Datos
  url: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Función para AGREGAR un agremiado
  agregarAgremiado(NuevoAgremiado: any): Observable<any> {
    return this.http.post<any>(`${this.url}/agregarAgremiado`, NuevoAgremiado);
  }

  getAgremiado(): Observable<any>{
    return this.http.get<any>(this.url+'/obtenerAgremiados');
  }

  eliminarAgremiado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/eliminarAgremiado/${id}`);
  }

  obtenerAgremiadoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/obtenerAgremiado/${id}`);
  }

  actualizarAgremiado(id: number, datosActualizados: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/actualizarAgremiado/${id}`, datosActualizados);
  }
}
