import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OnInit, Inject } from '@angular/core';
import { DOCUMENT, DatePipe, formatDate } from '@angular/common';
import { IMAGE } from './img-base-64';
import { compose } from '@ngxs/store/operators';
import { isUndefined } from 'util';

export class PDFReport implements OnInit {

    wait = false;

    logoBase64 = ``;

    pdf = new PdfMakeWrapper();


    ngOnInit(): void {
        //  Margin
        this.pdf.pageSize('A4');
    }

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe) { }




    async onGenerate( report: DiagnosticReport ) {

        let finalReport: any = {
            content: [
                
            ]
        }

        let tableLapseOne: any = [];
    
        let tableLapseTwo: any = {};
        let tableLapseThree: any = {};

        console.log( report );
        report.sections.forEach( (section, index) => {

            
            if( section.lapse1.available ) {

                let prepareStudent:any;
                let allStudent: any = [];
                let diagnosticResult: any = [];

                section.lapse1.students.forEach( (student, index) => {

                    prepareStudent = [
                        { text: student.firstName },
                        { text: student.lastName },
                        { text: `${ student.cardType }-${student.cardId}`},
                    ]

                    // =======================
                    // Columnns

                     if( section.lapse1.math !== undefined ) {
                        prepareStudent = [
                             ...prepareStudent,
                             { text: student.multiplicationsPerMin },
                             { text: student.multiplicationsPerMinIndex },
                         ];
                     }
    
                    if(section.lapse1.reading !== undefined) {

                        prepareStudent = [
                              ...prepareStudent,
                              { text: student.wordsPerMin },
                              { text: student.wordsPerMinIndex },
                          ];

                    }
    
                    if( section.lapse1.logic !== undefined) {
                          prepareStudent = [
                              ...prepareStudent,
                              { text: student.operationsPerMin },
                              { text: student.operationsPerMinIndex },
                          ];
                    }
                    // Columnns
                    // =======================

                    allStudent.push(prepareStudent);
                });
            

                tableLapseOne.push({
                    table: {
                        body: allStudent
                    },
                    margin: [0,0,0,30]
                });

            }

            // if( section.lapse2.available ) {

            //     if( section.lapse2.math.available ) {

            //     }

            //     if(section.lapse2.reading.available) {

            //     }
            //     if(section.lapse2.logic.available) {

            //     }
            // }
            

            // if( section.lapse3.available ) {

            //     if( section.lapse3.math.available ) {

            //     }

            //     if(section.lapse3.reading.available) {

            //     }

            //     if(section.lapse3.logic.available) {

            //     }
            // }
        });


        finalReport.content.push(tableLapseOne);

        pdfMake.createPdf(finalReport).open();
    }

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

        let sectionResult: any = [];
        const sectionResultTTwo: any = [];

        let customSectionHeader: any = [];
        let customSectionHeaderTwo: any = [];

        let totalAverage: any = [];
        const totalAverageTwo: any = [];

        const testing = new Array<any>();
        const testingTwo = new Array<any>();

        report.sections.forEach(section => {

            /**
             * ========================================================
             * == Primer lapso
             * ========================================================
             */

            let firtsRow: any = [];
            let secondRow: any = [];
            let thirdRow: any = [];
            let students: any = [];

            if (section.lapse1.available) {


                // -- AAA --
                if (section.lapse1.math !== undefined && section.lapse1.reading !== undefined && section.lapse1.logic !== undefined) {

                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },
                        {},
                        {},
                        { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        { text: '' },
                        { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        { text: '' },
                        { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        { text: '' }
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1' },
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}`, colSpan: 2 },
                        { text: '' },
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}`, colSpan: 2 },
                        { text: '' },
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.logic.lastTestDate}`, colSpan: 2 },
                        { text: '' }
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment },
                        { text: `Meta: ${section.lapse1.math.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        { text: '' },
                        { text: `Meta: ${section.lapse1.reading.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        { text: '' },
                        { text: `Meta: ${section.lapse1.logic.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        { text: '' }
                    ];

                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];


                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.multiplicationsPerMin },
                            { text: studend.multiplicationsPerMinIndex },
                            { text: studend.wordsPerMin },
                            { text: studend.wordsPerMinIndex },
                            { text: studend.operationsPerMin },
                            { text: studend.operationsPerMinIndex },
                        ]);
                    });

                    totalAverage = {
                        table: {
                            widths: ['*', '*', '*', '*', ],
                            body: [
                                [
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: 'Resultados del diagnóstico' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text:  '' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: '' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: '' }
                                ],
                                [
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: 'Estudiantes participantes:' },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.math.participants },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.reading.participants },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.logic.participants }
                                ],
                                [
                                    { text: 'Promedio del resultado:' },
                                    { text: section.lapse1.math.resultAverage },
                                    { text: section.lapse1.reading.resultAverage },
                                    { text: section.lapse1.logic.resultAverage}
                                ],
                                [
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: 'Estudiantes sobre la meta:' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.math.overGoalStudents },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.reading.overGoalStudents },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.logic.overGoalStudents }
                                ],
                                [
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: 'Porcentaje sobre la meta:' },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.math.overGoalAverage },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.reading.overGoalAverage },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.logic.overGoalAverage }
                                ],
                                [
                                    { text: 'Promedio del índice:' },
                                    { text: section.lapse1.math.indexAverage },
                                    { text: section.lapse1.reading.indexAverage },
                                    { text: section.lapse1.logic.indexAverage }
                                ],
                            ],
                        },
                        margin: [60, 0, 0, 50]
                    };

                    // -- AAI --
                } else if (section.lapse1.math !== undefined && section.lapse1.reading !== undefined && section.lapse1.logic === undefined) {

                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },
                        {},
                        {},
                        { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1' },
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}`, colSpan: 2 },
                        {},
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}`, colSpan: 2 },
                        {},
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment },
                        { text: `Meta: ${section.lapse1.reading.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: `Meta: ${section.lapse1.math.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                    ];

                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];

                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.multiplicationsPerMin },
                            { text: studend.multiplicationsPerMinIndex },
                            { text: studend.wordsPerMin },
                            { text: studend.wordsPerMinIndex },
                        ]);
                    });


                    totalAverage = {
                        table: {
                            widths: ['*', '*', '*' ],
                            body: [
                                [
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: 'Resultados del diagnóstico' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text:  '' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: '' },
                                ],
                                [
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: 'Estudiantes participantes:' },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.math.participants },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.reading.participants },
                                ],
                                [
                                    { text: 'Promedio del resultado:' },
                                    { text: section.lapse1.math.resultAverage },
                                    { text: section.lapse1.reading.resultAverage },
                                ],
                                [
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: 'Estudiantes sobre la meta:' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.math.overGoalStudents },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.reading.overGoalStudents },
                                ],
                                [
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: 'Porcentaje sobre la meta:' },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.math.overGoalAverage },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.reading.overGoalAverage },
                                ],
                                [
                                    { text: 'Promedio del índice:' },
                                    { text: section.lapse1.math.indexAverage },
                                    { text: section.lapse1.reading.indexAverage },
                                ],
                            ],
                        },
                        margin: [60, 0, 0, 50]
                    };

                    // -- AIA --
                } else if (section.lapse1.math !== undefined && section.lapse1.reading === undefined && section.lapse1.logic !== undefined) {

                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },
                        {},
                        {},
                        { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1' },
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}`, colSpan: 2 },
                        {},
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.logic.lastTestDate}`, colSpan: 2 },
                        {},
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment },
                        { text: `Meta: ${section.lapse1.math.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: `Meta: ${section.lapse1.logic.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                    ];

                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];


                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.multiplicationsPerMin },
                            { text: studend.multiplicationsPerMinIndex },
                            { text: studend.operationsPerMin },
                            { text: studend.operationsPerMinIndex },
                        ]);
                    });

                    // -- IAA --
                } else if (section.lapse1.math === undefined && section.lapse1.reading !== undefined && section.lapse1.logic !== undefined) {
                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },

                        {},
                        {},
                        { text: 'Diagnóstico de lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1', colSpan: 0 },

                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}`, colSpan: 2 },
                        {},
                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.logic.lastTestDate}`, colSpan: 2 },
                        {}
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment, colSpan: 0 },

                        { text: `Meta: ${section.lapse1.reading.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: `Meta: ${section.lapse1.logic.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];

                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];


                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.wordsPerMin },
                            { text: studend.wordsPerMinIndex },
                            { text: studend.operationsPerMin },
                            { text: studend.operationsPerMinIndex },
                        ]);
                    });

                    totalAverage = {
                        table: {
                            widths: ['*', '*', '*', '*', ],
                            body: [
                                [
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: 'Resultados del diagnóstico' },
                                
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: '' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: '' }
                                ],
                                [
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: 'Estudiantes participantes:' },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.reading.participants },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.logic.participants }
                                ],
                                [
                                    { text: 'Promedio del resultado:' },
                                    { text: section.lapse1.reading.resultAverage },
                                    { text: section.lapse1.logic.resultAverage}
                                ],
                                [
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: 'Estudiantes sobre la meta:' },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.reading.overGoalStudents },
                                    { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: section.lapse1.logic.overGoalStudents }
                                ],
                                [
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: 'Porcentaje sobre la meta:' },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.reading.overGoalAverage },
                                    { fillColor: '#42b16a', color: '#FFF', bold: true, text: section.lapse1.logic.overGoalAverage }
                                ],
                                [
                                    { text: 'Promedio del índice:' },
                                  
                                    { text: section.lapse1.reading.indexAverage },
                                    { text: section.lapse1.logic.indexAverage }
                                ],
                            ],
                        },
                        margin: [60, 0, 0, 50]
                    };


                } else if (section.lapse1.math !== undefined && section.lapse1.reading === undefined && section.lapse1.logic === undefined) {
                    // -- AII --

                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },
                        {},
                        {},
                        { text: 'Diagnóstico de multiplicación', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1' },

                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.math.lastTestDate}`, colSpan: 2, width: '*' },
                        {}
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment },
                        { text: `Meta: ${section.lapse1.math.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];


                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];


                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.multiplicationsPerMin },
                            { text: studend.multiplicationsPerMinIndex },

                        ]);
                    });

                } else if (section.lapse1.math === undefined && section.lapse1.reading !== undefined && section.lapse1.logic === undefined) {
                    // -- IAI --
                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },
                        {},
                        {},
                        { text: 'Diagnóstico de Lectura', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1' },

                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.reading.lastTestDate}`, colSpan: 2 },
                        {}
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment },
                        { text: `Meta: ${section.lapse1.reading.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];


                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];


                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.wordsPerMin },
                            { text: studend.wordsPerMinIndex },

                        ]);
                    });



                } else if (section.lapse1.math === undefined && section.lapse1.reading === undefined && section.lapse1.logic !== undefined) {

                    // ======================================================

                    firtsRow = [
                        { text: 'Grado: ' },
                        { text: section.grade, colSpan: 3 },
                        {},
                        {},
                        { text: 'Diagnóstico de razonamiento lógico - matemático', fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];

                    secondRow = [
                        { text: 'Seccion: ' },
                        { text: section.name },
                        { text: 'Lapso: ' },
                        { text: '1' },

                        { fillColor: '#2e8aaa', color: '#FFF', bold: true, text: `Fecha del diagnóstico: ${section.lapse1.logic.lastTestDate}`, colSpan: 2 },
                        {}
                    ];

                    thirdRow = [
                        { text: 'Docente: ' },
                        { text: section.teacher },
                        { text: 'Matrícula de la sección: ' },
                        { text: section.enrollment },
                        { text: `Meta: ${section.lapse1.logic.overGoalAverage}`, fillColor: '#2e8aaa', color: '#FFF', bold: true, colSpan: 2 },
                        {}
                    ];


                    sectionResult = [
                        { text: 'Nombre', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Apellido', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'Cedula', fillColor: '#42b16a', color: '#FFF', bold: true, colSpan: 2 },
                        {},
                        { text: 'resultado', fillColor: '#42b16a', color: '#FFF', bold: true },
                        { text: 'indice', fillColor: '#42b16a', color: '#FFF', bold: true },
                    ];


                    section.lapse1.students.forEach(studend => {

                        students.push([
                            { text: studend.firstName },
                            { text: studend.lastName },
                            { text: `${studend.cardType} - ${studend.cardId}`, colSpan: 2 },
                            {},
                            { text: studend.operationsPerMin },
                            { text: studend.operationsPerMinIndex },
                        ]);
                    });
                }
            }

            /**
             * ========================================================
             * == Primer lapso
             * ========================================================
             */

            let firtsRowTwo: any = [];
            let secondRowTwo: any = [];
            let thirdRowTwo: any = [];
            let studentsTwo: any = [];


            if( section.lapse2.available ) {

            }

             /**
             * ========================================================
             * == Segundo lapso
             * ========================================================
             */

            customSectionHeader = {
                table: {
                    // widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
                    body: [
                        firtsRow,
                        secondRow,
                        thirdRow,
                        sectionResult,
                    ],
                },
                margin: [0, 0, 0, 40]
            };


            students.forEach(student => {
                customSectionHeader.table.body.push(student);
            });

            customSectionHeaderTwo = {
                table: {
                    body: [
                        [ {  text: 'Registro de la tabla' } ]
                    ]
                }
            };

            testing.push(customSectionHeader);
            //testing.push( totalAverage );
            // testing.push( {
            //     table: {
            //         body: [
            //             [ { text: 'registro' } ]
            //         ]
            //     }
            // } );
            testing.push(customSectionHeaderTwo);
        });

        // ========================================
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
            ],
        };
        pdfMake.createPdf(docDefinition).open();
    }
}
