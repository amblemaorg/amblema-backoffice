import { Injectable, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class GraphPdfService {
  
  constructor() { }

  public pdfOpen( htmlData: ElementRef ) : void {
    let DATA = htmlData.nativeElement;
    console.log(DATA); 
    let doc = new jsPDF('p','pt', 'a4');

    doc.fromHTML(DATA.innerHTML,15,15);
    doc.output('dataurlnewwindow');
  }
}
