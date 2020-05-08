import { Inject } from '@angular/core';
import { DOCUMENT, DatePipe } from '@angular/common';
import { IMAGE } from '../img-base-64';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PDFReportMath {

    constructor(@Inject( DOCUMENT ) private document: any, private datePipe: DatePipe,) {}

    async generateMathOlympics() {

        // -- Mock data --

        let mockData: any = [
            {
                academicPeriod: ['2016-20']
            }
        ]

        // -- / End -- 

        const documentHeader: any = [
            {
                image: IMAGE,
                width: 100,
                absolutePosition: { x: 30, y: 60 }
            },
            {
                alignment: 'center',
                columns: [
                    {
                        width: '*',
                        text: 'Reporte de las olimpíadas de matemáticas',
                        color: '#2e8aaa',
                        alignment: 'center',
                        fontSize: 15,
                        bold: true,
                        margin: [0, 65],
                    },
                ]
            },
        ]

        let finalDocument: any = {
            info: {
                title: 'Reporte de usuarios',
                author: 'Binaural C.A',
                subject: 'Reporte de usuarios',
                keywords: 'Reporte, usuarios, padrino, coordinador, docente, escuela, estudiante',
            },
            pageSize: 'A4',
            content: [
                documentHeader,
                [
                    { 
                        fontSize: 15,
                        text: 'Período académico: 2016 - 2017', alignment: 'left', bold: true }
                ]
            ],
            defaultStyle: {
                fontSize: 10,
            }
        }




        pdfMake.createPdf(finalDocument).open();
    }
}