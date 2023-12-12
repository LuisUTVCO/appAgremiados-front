import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.scss'],
})
export class VerSolicitudesComponent {

  solicitudes: any[] = []; // Ajusta el tipo de datos según la estructura de tus solicitudes
  fechaInicio?: Date;
  fechaFin?: Date;
  solicitudOrginales: any[] = [];
  solicitudFiltrado: any[] = [];

  // Ajusta el tipo de datos según la estructura de tus solicitudes

  constructor(private solic: SolicitudService,) {
  }

  ngOnInit() {
    this.getsolicitud();
  }

  getsolicitud() {
    this.solic.getVersolicitud().subscribe(
      (data) => {
        this.solicitudOrginales = data;
        this.solicitudes = data; // Asigna los datos recibidos al arreglo agremiados
        console.log('Datos obtenidos:', this.solicitudes); // Muestra los datos en la consola
      },
      (error) => {
        console.error('Error al obtener solicitud:', error);
      }
    );
  }

  // Agrega esta función para filtrar las solicitudes por fecha
  filtrarSolicitudes() {
    if (this.fechaInicio && this.fechaFin) {
      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);

      console.log(fechaInicio);
      console.log(fechaFin);

      this.solicitudFiltrado = this.solicitudOrginales.filter((solicitud) => {
        const fechaSolicitud = new Date(solicitud.updated_at);
        return fechaSolicitud >= fechaInicio && fechaSolicitud <= fechaFin;
      });

      this.solicitudes = this.solicitudFiltrado;
    }

    // Lógica para filtrar las solicitudes según las fechas seleccionadas
    // Utiliza la función filter para obtener solo las solicitudes que cumplen con el criterio

  }

  descargarSolicitud(ruta_archivo: string) {
    const partes = ruta_archivo.split('/');
    const nombreArchivo = partes[partes.length - 1];

    this.solic.dowlandArchivo(nombreArchivo).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });

        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = nombreArchivo;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el archivo', error);
      }
    );
  }

}
