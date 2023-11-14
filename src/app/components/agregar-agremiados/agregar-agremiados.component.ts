import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgremiadoService } from 'src/app/services/agremiado.service';

@Component({
  selector: 'app-agregar-agremiados',
  templateUrl: './agregar-agremiados.component.html',
  styleUrls: ['./agregar-agremiados.component.scss'],
})
export class AgregarAgremiadosComponent implements OnInit {

  formAgremiado: FormGroup;

  constructor(private serviceAgremiado: AgremiadoService, private fb: FormBuilder) {

    this.formAgremiado = this.fb.group({
      a_paterno: ['', Validators.required],
      a_materno: [''],
      nombre: ['', Validators.required],
      sexo: [''],
      NUP: ['', Validators.required],
      NUE: ['', Validators.required],
      RFC: ['', Validators.required],
      NSS: ['', Validators.required],
      fecha_nacimiento: [null, Validators.required], // Cambiado a date
      telefono: ['', Validators.required],
      cuota: ['', Validators.required]
    });

  }

  ngOnInit() { }

  newAgremiado() {
    const infoNewAgremiado = this.formAgremiado.value;

    this.serviceAgremiado.agregarAgremiado(infoNewAgremiado).subscribe(
      response => {
        console.log('Agremiado agregado correctamente', response);
      },
      error => {
        console.error('Error al agregar agremiado', error);
      }
    );
  }
}
