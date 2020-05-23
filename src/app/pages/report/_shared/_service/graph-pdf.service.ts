import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

const html2canvas = require('html2canvas');

@Injectable({
  providedIn: 'root',
})
export class GraphPdfService {
  constructor() {}

  public pdfOpen(htmlData: any): void {
    // -- An instance of the html canvas is obtained --
    html2canvas(htmlData).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // <-- Calculate the width
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png'); // <-- Convert canvas to image
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.output('dataurlnewwindow'); // <-- Open in the taps
    });
  }
}
