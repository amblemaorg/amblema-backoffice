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

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe) { }

    async onGenerate(report: DiagnosticReport) {

        const finalReport: any = {
            pageSize: 'A4',
            content: [],
        };

        // -- Title --
        const titleDocument: any = [
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
        ];

        // -- Header document --

        const documentSubHeaderData: any = {
            table: {
                body: [
                    [
                        { text: 'Escuela:' },
                        { text: report.school },
                        { text: 'Fecha:' },
                        { text: formatDate(report.date, 'd MMMM y', 'es-VE') },
                    ],
                    [
                        { text: 'Coordinador:' },
                        { text: report.coordinator },
                        { text: 'Período académico:' },
                        { text: report.schoolYear },
                    ]
                ]
            },
            margin: [0, 0, 0, 30]
        };

        // -- / End header document --

        /**
         * The maximum number of column is 9
         */

        const tableLapseOne: any = [];
        const tableLapseTwo: any = {};
        const tableLapseThree: any = {};

        // -- Variables style --

        const colorRowOne: any = { fillColor: '#2e8aaa', color: '#FFF', bold: true };
        const colorRowTwo: any = { fillColor: '#42b16a', color: '#FFF', bold: true };

        // -- Variables style --


        report.sections.forEach((section, index) => {
            if (section.lapse1.available) {

                // -- Prepare table header --

                let firstRowHeaderTable: any = [
                    { text: 'Grado: ' },
                    { text: section.grade, colSpan: 2 },
                    { text: `` }
                ];

                let penultimateRowHeaderTable: any = [
                    { text: 'Sección: ' },
                    { text: section.name },
                    { text: `Lapso: 1` }
                ];

                let latestRowHeaderTable: any = [
                    { text: 'Docente: ' },
                    { text: section.teacher },
                    { text: ` Matrícula de la sección: ${section.enrollment}` }
                ];

                // -- End --

                let prepareStudent: any;
                const allStudent: any = [];

                let columnsNameStudent: any = [
                    { ...colorRowTwo, text: 'Nombre' },
                    { ...colorRowTwo, text: 'Apellido' },
                    { ...colorRowTwo, text: 'Cédula' }];

                const diagnosticResult: any = [
                    [{ ...colorRowOne, text: 'Resultados del diagnóstico:' }],
                    [{ ...colorRowOne, text: 'Estudiantes participantes:' }],
                    [{ ...colorRowTwo, text: 'Promedio del resultado:' }],
                    [{ text: 'Estudiantes sobre la meta:' }],
                    [{ ...colorRowOne, text: 'Porcentaje sobre la meta:' }],
                    [{ ...colorRowTwo, text: 'Promedio del índice:' }],
                ];

                // -- Creating table students --
                section.lapse1.students.forEach((student, key) => {

                    // -- Initial data --
                    prepareStudent = [
                        { text: student.firstName },
                        { text: student.lastName },
                        { text: `${student.cardType === '1' ? 'V' : 'E' }-${student.cardId}` },
                    ];

                    // =======================
                    // Columns

                    if (section.lapse1.math !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.multiplicationsPerMin },
                            { text: student.multiplicationsPerMinIndex },
                        ];
                    }

                    if (section.lapse1.reading !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.wordsPerMin },
                            { text: student.wordsPerMinIndex },
                        ];

                    }

                    if (section.lapse1.logic !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.operationsPerMin },
                            { text: student.operationsPerMinIndex },
                        ];
                    }
                    // -- Columnns --
                    // =======================

                    // -- Add rows --
                    allStudent.push(prepareStudent);
                });

                // ==========================
                // -- Creating diagnostics --

                if (section.lapse1.math !== undefined) {

                    diagnosticResult[0].push({ text: 'Diagnóstico de multiplicación' });
                    diagnosticResult[1].push({ text: section.lapse1.math.participants });
                    diagnosticResult[2].push({ text: section.lapse1.math.resultAverage });
                    diagnosticResult[3].push({ text: section.lapse1.math.overGoalStudents });
                    diagnosticResult[4].push({ text: section.lapse1.math.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse1.math.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse1.math.goal}`, colSpan: 2 },
                        {}
                    ];


                    const datePrepare: any = section.lapse1.math.lastTestDate === '' ? ''
                        : formatDate(section.lapse1.math.lastTestDate, 'd MMMM y', 'es-VE');
                    penultimateRowHeaderTable = [
                        ...penultimateRowHeaderTable,
                        { ...colorRowOne, text: 'Fecha del diagnóstico: \n' + datePrepare, colSpan: 2 },
                        {}
                    ];

                    firstRowHeaderTable = [
                        ...firstRowHeaderTable,
                        { ...colorRowOne, text: `Diagnóstico de multiplicación`, colSpan: 2 },
                        {}
                    ];
                }

                if (section.lapse1.reading !== undefined) {


                    diagnosticResult[0].push({ text: 'Diagnóstico de lectura' });
                    diagnosticResult[1].push({ text: section.lapse1.reading.participants });
                    diagnosticResult[2].push({ text: section.lapse1.reading.resultAverage });
                    diagnosticResult[3].push({ text: section.lapse1.reading.overGoalStudents });
                    diagnosticResult[4].push({ text: section.lapse1.reading.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse1.reading.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse1.reading.goal}`, colSpan: 2 },
                        {}
                    ];

                    const datePrepare: any = section.lapse1.reading.lastTestDate === '' ? ''
                    : formatDate(section.lapse1.reading.lastTestDate, 'd MMMM y', 'es-VE');
                    penultimateRowHeaderTable = [
                        ...penultimateRowHeaderTable,
                        { ...colorRowOne, text: 'Fecha del diagnóstico: \n' + datePrepare, colSpan: 2 },
                        {}
                    ];

                    firstRowHeaderTable = [
                        ...firstRowHeaderTable,
                        { ...colorRowOne, text: `Diagnóstico de lectura`, colSpan: 2 },
                        {}
                    ];
                }

                if (section.lapse1.logic !== undefined) {


                    diagnosticResult[0].push({ text: 'Diagnóstico de razonamiento lógico - mtemático' });
                    diagnosticResult[1].push({ text: section.lapse1.logic.participants });
                    diagnosticResult[2].push({ text: section.lapse1.logic.resultAverage });
                    diagnosticResult[3].push({ text: section.lapse1.logic.overGoalStudents });
                    diagnosticResult[4].push({ text: section.lapse1.logic.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse1.logic.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse1.logic.goal}`, colSpan: 2 },
                        {}
                    ];

                    const datePrepare: any = section.lapse1.logic.lastTestDate === '' ? ''
                    : formatDate(section.lapse1.logic.lastTestDate, 'd MMMM y', 'es-VE');
                    penultimateRowHeaderTable = [
                        ...penultimateRowHeaderTable,
                        {
                            ...colorRowOne,
                            text: 'Fecha del diagnóstico: \n' + datePrepare, colSpan: 2
                        },
                        {}
                    ];

                    firstRowHeaderTable = [
                        ...firstRowHeaderTable,
                        { ...colorRowOne, text: `Diagnóstico de razonamiento lógico - mtemático`, colSpan: 2 },
                        {}
                    ];
                }

                // -- End --
                // ==========================

                // =================================
                // -- Prepare header table

                allStudent.unshift(columnsNameStudent);
                allStudent.unshift(latestRowHeaderTable);
                allStudent.unshift(penultimateRowHeaderTable);
                allStudent.unshift(firstRowHeaderTable);

                // -- End --
                // ==========================

                // -- Create table students --
                tableLapseOne.push({
                    table: {
                        body: allStudent
                    },
                    margin: [0, 0, 0, 30]
                });

                // -- Diagnostic --
                tableLapseOne.push({
                    table: {
                        body: diagnosticResult
                    },
                    margin: [0, 0, 0, 30]
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


        // ===========================================
        // -- Set body all table lapse and sections --
        // ===========================================
        finalReport.content.push(tableLapseOne);
        finalReport.content.unshift(documentSubHeaderData);
        finalReport.content.unshift(titleDocument);
        pdfMake.createPdf(finalReport).open();
    }

}
