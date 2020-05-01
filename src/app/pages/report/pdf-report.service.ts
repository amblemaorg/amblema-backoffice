import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OnInit, Inject } from '@angular/core';
import { DOCUMENT, DatePipe, formatDate } from '@angular/common';
import { IMAGE } from './img-base-64';

export class PDFReport implements OnInit {

    wait = false;

    logoBase64 = ``;

    pdf = new PdfMakeWrapper();


    ngOnInit(): void {
        //  Margin
        this.pdf.pageSize('A4');
    }

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe ) { }

    async onGenerateDiagnosticReport(report: DiagnosticReport) {


        console.log( report );

        /**
         * ========================================
         * == Sub Header
         * ========================================
         */

        const marginSubHeader = [0, 0, 5, 10];
        const subHeaderData: any = [
            [
                { text: 'Escuela:', margin: marginSubHeader },
                { text: report.school, margin: marginSubHeader },
                { text: 'Fecha:', margin: marginSubHeader },
                { text: formatDate(report.date, 'd MMMM, y', 'es-VE'), margin: marginSubHeader },
            ],
            [
                { text: 'Coordinador:', margin: marginSubHeader },
                { text: report.coordinator, margin: marginSubHeader },
                { text: 'Período académico:', margin: marginSubHeader },
                { text: report.schoolYear, margin: marginSubHeader },
            ]
        ];

        const docDefinition = {
            pageSize: 'A3',
            info: {
                title: 'Reporte de diagnósticos',
                author: 'Franklin Perdomo, Stephanie Soteldo',
                subject: 'Reporte',
                keywords: 'Grados, escuelas, reportes, puntuación',
            },
            content: [

                // -- Header document --
                {
                    image: IMAGE,
                    width: 100,
                    absolutePosition: { x: 30, y: 60}
                },
                {
                    alignment: 'center',
                    columns: [
                        {
                            width: '*',
                            text: 'Reporte de diagnósticos',
                            color: '#2e8aaa',
                            alignment: 'center',
                            fontSize: 20,
                            bold: true,
                            margin: [0, 60],
                        },
                    ]
                },

                // -- Sub header data ---
                {

                    table: {
                        body: subHeaderData
                    },
                },

                // -- Margin --
                {
                    text: '', margin: [0, 0, 0, 20]
                },

                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['Grado:', '1re Grado', '', ''],
                            ['Sección:', 'A', 'Lapso:', '1'],
                            ['Docente:', 'Juan Gallegos', 'Matrícula de la sección:', '23423#'],
                        ]
                    }
                },

                {
                    style: 'tableExample',

                    // -- Student result --
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                        body: [
                            // -- Header Table --
                            [
                                { text: 'Nombre y apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Cédula', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Índice', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Índice', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                                { text: 'Índice', fillColor: '#42b16a', color: '#FFF', bold: true },
                            ],

                            /**
                             * Table body insert records
                             */

                        ]
                    }
                }
            ],
        };

        pdfMake.createPdf(docDefinition).open();
    }
}
