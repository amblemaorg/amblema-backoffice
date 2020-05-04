import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OnInit, Inject } from '@angular/core';
import { DOCUMENT, DatePipe, formatDate } from '@angular/common';
import { IMAGE } from './img-base-64';
import { compose } from '@ngxs/store/operators';

export class PDFReport implements OnInit {

    wait = false;

    logoBase64 = ``;

    pdf = new PdfMakeWrapper();


    ngOnInit(): void {
        //  Margin
        this.pdf.pageSize('A4');
    }

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe) { }

    async onGenerateDiagnosticReport(report: DiagnosticReport) {


        console.log(report);

        /**
         * ========================================
         * == Sub header document
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


        /**
         * ========================================
         * == Sections
         * ========================================
         */

        const sectionRegister: any[] = [];

        // -- All sections --
        report.sections.forEach(section => {
            sectionRegister.push(
                ['Grado: ', section.grade],
                ['Seccion: ', section.name],
            );
        });

        let sectionResult = new Array<any>();
        let customSectionHeader: any = [];

        let testing = new Array<any>();

        report.sections.forEach(section => {

            let firtsRow: any;
            let secondRow: any;
            let thirdRow: any;

            // -- AAA --
            if (section.lapse1.math !== undefined && section.lapse1.reading !== undefined && section.lapse1.logic !== undefined) {
                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 3 }, {}, {},
                { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, },
                { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, },
                { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, }
                ];

                secondRow = [
                    { text: 'Seccion: ' },
                    { text: section.name },
                    { text: 'Lapso: ' },
                    { text: '1' },
                    { text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}` },
                    { text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}` },
                    { text: `Fecha del diagnóstico: ${section.lapse1.logic.lastTestDate}` }
                ];

                // -- AAI --
            } else if (section.lapse1.math !== undefined && section.lapse1.reading !== undefined && section.lapse1.logic === undefined) {

                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 3 }, {}, {},
                { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, },
                { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                {}];

                secondRow = [
                    { text: 'Seccion: ' },
                    { text: section.name },
                    { text: 'Lapso: ' },
                    { text: '1' },
                    { text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}` },
                    { text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}`, colSpan: 2 },
                    {}
                ];

                // -- AIA --
            } else if (section.lapse1.math !== undefined && section.lapse1.reading === undefined && section.lapse1.logic !== undefined) {

                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 3 }, {}, {},
                { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 }, {},
                { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, }
                ];

                // -- IAA --
            } else if (section.lapse1.math === undefined && section.lapse1.reading !== undefined && section.lapse1.logic !== undefined) {
                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 4 }, {}, {}, {},
                { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, },
                { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, }
                ];

            } else if (section.lapse1.math !== undefined && section.lapse1.reading === undefined && section.lapse1.logic === undefined) {
                // -- AII --

                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 3 }, {}, {},
                { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 3 },
                {}, {}
                ];
            } else if (section.lapse1.math === undefined && section.lapse1.reading !== undefined && section.lapse1.logic === undefined) {
                // -- IAI --
                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 4 }, {}, {}, {},
                { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 }, {}
                ];
            } else if (section.lapse1.math === undefined && section.lapse1.reading === undefined && section.lapse1.logic !== undefined) {
                // -- IIA --
                firtsRow = [{ text: 'Grado: ' }, { text: section.grade, colSpan: 4 }, {}, {}, {}, {},
                { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, }
                ];
            }

            customSectionHeader = {
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
                    body: [
                        firtsRow,
                        secondRow
                        // [
                        //     { text: 'Seccion: ' },
                        //     { text: section.name },
                        //     { text: 'Lapso: ' },
                        //     { text: '1' },
                        //     section.lapse1.reading !== undefined ? { text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}` } : {},
                        //     section.lapse1.math !== undefined ? { text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}` } : {},
                        //     section.lapse1.logic !== undefined ? { text: `Fecha del diagnóstico: ${section.lapse1.logic.lastTestDate}` } : {},
                        // ],
                        // [
                        //     { text: 'Docente: ' },
                        //     { text: section.teacher },
                        //     { text: 'Matrícula de la sección: ' },
                        //     { text: section.enrollment },
                        //     section.lapse1.reading !== undefined ? { text: `Meta: ${section.lapse1.reading.overGoalAverage}` } : {},
                        //     section.lapse1.math !== undefined ? { text: `Meta: ${section.lapse1.math.overGoalAverage}` } : {},
                        //     section.lapse1.logic !== undefined ? { text: `Meta: ${section.lapse1.logic.overGoalAverage}` } : {},
                        // ],
                    ],
                },
                margin: [0, 0, 0, 40]
            };

            // -- Header studiants -- 
            // customSectionHeader.table.body.push([
            //     { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
            //     { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
            //     { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 1 },
            //     {},
            //     { text: 'resultado - indice', fillColor: '#42b16a', color: '#FFF', bold: true },
            //     { text: 'resultado - indice', fillColor: '#42b16a', color: '#FFF', bold: true },
            //     { text: 'resultado - indice', fillColor: '#42b16a', color: '#FFF', bold: true },

            // ])
            testing.push(customSectionHeader)
        });


        // -- Prepare the data --
        // ========================================

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
                    absolutePosition: { x: 30, y: 60 }
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
                    margin: [0, 0, 0, 40]
                },

                {
                    columns: [
                        testing,

                    ]
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
