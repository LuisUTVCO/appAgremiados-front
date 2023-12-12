import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgremiadoService } from 'src/app/services/agremiado.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-agremiados',
  templateUrl: './ver-agremiados.component.html',
  styleUrls: ['./ver-agremiados.component.scss'],
})
export class VerAgremiadosComponent implements OnInit {

  @ViewChild('content', { static: false }) content: ElementRef<any>;

  agremiados: any[] = []; // Ajusta el tipo de datos según la estructura de tus agremiados

  constructor(private serviceAgremiado: AgremiadoService, private route: Router) {
    this.content = {} as ElementRef;
  }

  ngOnInit() {
    this.verAgremiados();
  }

  verAgremiados() {
    this.serviceAgremiado.getAgremiado().subscribe(
      (data) => {
        this.agremiados = data; // Asigna los datos recibidos al arreglo agremiados
        this.agremiados.reverse();
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

  eliminarAgremiado(id: number) {

    this.serviceAgremiado.eliminarAgremiado(id).subscribe(
      (res: any) => {
        console.log('Agremiado eliminado:', res);
        // Recargar los datos después de la eliminación
        this.verAgremiados();
      },
      (error) => {
        console.error('Error al eliminar agremiado:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrando una alerta con SweetAlert
        Swal.fire('Error', 'Error al eliminar el agremiado', 'error');
      }
    );
  }


  editaragremiado(id: number){
    console.log('ID Agremiado:', id);
    this.route.navigateByUrl(`editaragremiado/${id}`); 
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
          pdf.save('Listado de agremiados.pdf');
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
