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

  getAagremido(): Observable<any>{
    return this.http.get<any>(this.url+'/obtenerAgremiados');
  }
  
}
