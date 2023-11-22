import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgremiadoService } from 'src/app/services/agremiado.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
export class VerAgremiadosComponent implements OnInit {

  @ViewChild('content', { static: false }) content: ElementRef<any>;

  agremiados: any[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados

  constructor(private serviceAgremiado: AgremiadoService) {
    this.content = {} as ElementRef;
  }

  ngOnInit() {
    this.verAgremiados();
  }

  verAgremiados() {
    this.serviceAgremiado.getAgremiado().subscribe(
      (data) => {
        this.agremiados = data; // Asigna los datos recibidos al arreglo agremiados
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.verAgremiados();
    // Llama a generarPDF después de que la vista se haya inicializado
    this.generarPDF();
  }

  generarPDF() {
    if (this.content && this.content.nativeElement) {
      const content: HTMLElement = this.content.nativeElement;
      console.log('Elemento content:', this.content.nativeElement); 

      html2canvas(content).then((canvas) => {
        // Verifica que el canvas tenga contenido antes de continuar
        if (canvas.toDataURL('image/png') !== 'data:,') {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF.default();

          // Ajusta los valores según tus necesidades
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('Listado de agremaidos.pdf');
          console.log('Descargando pdf...');

        } else {
          console.error('El canvas está vacío o la imagen está dañada.');
        }
      });
    } else {
      console.error('Elemento content no encontrado o nulo.');
    }
  }

  // generarPDF() {
  //   const content: HTMLElement = this.content.nativeElement;

  //   html2canvas(content).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF.default(); // Crea una instancia de jsPDF

  //     // Ajusta los valores según tus necesidades
  //     const imgWidth = 210;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save('Agremiado.pdf');
  //     console.log('Descargando PDF...');
  //   });
  // }

}
