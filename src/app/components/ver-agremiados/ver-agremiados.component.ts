import { Component, OnInit } from '@angular/core';
import { AgremiadoService } from 'src/app/services/agremiado.service';

interface agremiado {
  id: number;
  a_paterno: string;
  a_materno: string;
  nombre: string;
  sexo: string;
  NUP: string;
  NUE: string;
  RFC: string;
  NSS: string;
  fecha_nacimiento: Date,
  telefono: string;
  cuota: string;
}


@Component({
  selector: 'app-ver-agremiados',
  templateUrl: './ver-agremiados.component.html',
  styleUrls: ['./ver-agremiados.component.scss'],
})
export class VerAgremiadosComponent  implements OnInit {

  agremiados: any[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados

  constructor(private serviceAgremiado: AgremiadoService) { }

  ngOnInit() {
    this.verAgremiados();
  }

  verAgremiados() {
    this.serviceAgremiado.getAagremido().subscribe(
      (data) => {
        this.agremiados = data; // Asigna los datos recibidos al arreglo agremiados
        console.log('Datos obtenidos:', this.agremiados); // Muestra los datos en la consola
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    );
  }

}
