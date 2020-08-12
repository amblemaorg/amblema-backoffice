import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { IMAGE } from '../../img-base-64';
const html2canvas = require('html2canvas');

@Injectable({
  providedIn: 'root',
})
export class GraphPdfService {
  constructor() {}



  public pdfOpen(htmlData: any): void {
    // -- An instance of the html canvas is obtained --

    html2canvas(htmlData).then((canvas) => {

      document.body.appendChild(canvas);

      const imgWidth = 208;
      const pageHeight = 295;

      const imgHeight = (canvas.height * imgWidth) / canvas.width; // <-- Calculate the width
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png'); // <-- Convert canvas to image
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 20;


      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.addImage(IMAGE, 'PNG', 18, 15, 25, 25 );

      // pdf.save(`${Math.random()}.pdf`)
      // pdf.output('dataurlnewwindow'); // <-- Open in the taps
      window.open(pdf.output('bloburl'), '_blank');
    });
  }
}
