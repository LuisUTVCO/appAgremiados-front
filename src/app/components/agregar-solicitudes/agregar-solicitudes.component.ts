import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-agregar-solicitudes',
  templateUrl: './agregar-solicitudes.component.html',
  styleUrls: ['./agregar-solicitudes.component.scss'],
})
export class AgregarSolicitudesComponent {

  datosNuevoSolicitud: any = {};
  respuestaSolicitud: any;
  archivoSeleccionado: File | null = null;
  selectedFile: any;
  Form_solicitud: any; // Asegúrate de que Form_solicitud esté declarado y accesible.

  constructor(
    private solicitudService: SolicitudService,
    private rou: Router,
    private fb: FormBuilder) {
    this.Form_solicitud = this.fb.group({
      NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),]],
      ruta_archivo: ['', [Validators.required]]
    });
  }




  onFileSelected(event: any) {
    const archivoInput = event.target.files[0];
    this.selectedFile = archivoInput; // Cambié 'file' a 'archivoInput'
  }

  guardar() {
    if (this.selectedFile) {
      const formdata = new FormData();
      let data = this.Form_solicitud.getRawValue();
      for (const datakey in data) {
        formdata.append(datakey, data[datakey]);
      }
      formdata.append('ruta_archivo', this.selectedFile);

      this.solicitudService.agregarSolicitud(formdata).subscribe(
        (response) => {
          // Puedes manejar la respuesta del servicio aquí
          console.log('Agregado exitosamente');
          // Reload the page after successful addition
          setTimeout(() => {
            location.reload();
          }, 2000); // Reload after 2 seconds (adjust as needed)
        },
        (error) => {
          // Handle error if needed
          console.error('Error al agregar solicitud', error);
        }
      );
    } else {
      console.log('No se ha seleccionado un archivo');
    }
  }
}
