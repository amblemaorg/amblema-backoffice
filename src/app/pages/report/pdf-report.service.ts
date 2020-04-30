import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class PDFReport implements OnInit {
    
    wait: boolean = false;
    
    pdf = new PdfMakeWrapper();


    ngOnInit(): void {
        //  Margin
        this.pdf.pageSize('A4');
    }

    constructor(@Inject(DOCUMENT) private document: any,) {}

    async onGenerateDiagnosticReport( report: DiagnosticReport ) {
        //  Instence document
        
        this.pdf.add('Hello world!');

        this.pdf.create().open();

    }   
}