import { PdfMakeWrapper } from 'pdfmake-wrapper';
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


    borderCustom = {
        hLineColor(i, node) {
            return '#024e21';
        },
        vLineColor(i, node) {
            return '#024e21';
        },
    };


    ngOnInit(): void {
        //  Margin
        this.pdf.pageSize('A4');
    }

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe) { }

    /**
     * User report
     */

    async generateUserReport( dataUsers: any ) {

        const finalReport: any = {
            info: {
                title: 'Reporte de usuarios',
                author: 'Binaural C.A',
                subject: 'Reporte de usuarios',
                keywords: 'Reporte, usuarios, padrino, coordinador, docente, escuela, estudiante',
            },
            pageOrientation: 'landscape',
            pageSize: 'A4',
            content: [
            ],
            defaultStyle: {
                fontSize: 8,
            }
        };

        const colorHeaderRow: any = { fillColor: '#42b16a', color: '#FFF', bold: true };

        const headerDocument: any = [
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
                        text: dataUsers.typeUser === '0' ? 'Reporte de Padrinos'
                        : dataUsers.typeUser === '1' ? 'Reporte de Coordinadores' : dataUsers.typeUser === '2' ? 'Reporte de Escuelas'
                        : 'Reporte de Docentes',
                        color: '#2e8aaa',
                        alignment: 'center',
                        fontSize: 20,
                        bold: true,
                        margin: [0, 60],
                    },
                ]
            },
        ];


        // -- Type user --
        if ( dataUsers.typeUser === '0' ) {

            const sponsorHeaderRecord: any = [
                { ...colorHeaderRow, text: 'Nombre de la empresa' },
                { ...colorHeaderRow, text: 'RIF' },
                { ...colorHeaderRow, text: 'Correo' },
                { ...colorHeaderRow, text: 'Teléfono' },
                { ...colorHeaderRow, text: 'Estado' },
                { ...colorHeaderRow, text: 'Municipio' },
                { ...colorHeaderRow, text: 'Ciudad' },
                { ...colorHeaderRow, text: 'Escuela(s) que apadrina' },
                { ...colorHeaderRow, text: 'Estatus' },
            ];

            const sponsorRecords: any = [];

            // -- Inser the records
            dataUsers.users.forEach(sponsor => {
                sponsorRecords.push([
                { text: sponsor.name },
                { text: sponsor.companyRif },
                { text: sponsor.email },
                { text: sponsor.companyPhone },
                { text: sponsor.addressState },
                { text: sponsor.addressMunicipality },
                { text: sponsor.addressCity },
                { text: sponsor.schools },
                { text: sponsor.status === '1' ? 'Activo' : 'Inactivo' },
                ]);
            });

            sponsorRecords.unshift( sponsorHeaderRecord );
            finalReport.content.push({
                table: {
                    widths: '11%',
                    body: sponsorRecords,
                    layout: this.borderCustom
                },
                margin: [0, 0, 0, 30]

            });
        } else if (dataUsers.typeUser === '1') {

            const coordinatorRecords: any = [];

            const coordinatorHeaderRecord: any = [
                { ...colorHeaderRow, text: 'Nombre' },
                { ...colorHeaderRow, text: 'Apellido' },
                { ...colorHeaderRow, text: 'Correo' },
                { ...colorHeaderRow, text: 'Identidad' },
                { ...colorHeaderRow, text: 'Teléfono Móvil' },
                { ...colorHeaderRow, text: 'Teléfono de habitación' },
                { ...colorHeaderRow, text: 'Estado' },
                { ...colorHeaderRow, text: 'Municipio' },
                { ...colorHeaderRow, text: 'Calles / carrerass' },
                { ...colorHeaderRow, text: 'Casa / Edificio' },
                { ...colorHeaderRow, text: 'AmbLe - Pensum' },
                { ...colorHeaderRow, text: 'Profesión' },
                { ...colorHeaderRow, text: 'Escuelas' },
                { ...colorHeaderRow, text: 'Estatus' },
            ];


            // -- Inser the records
            dataUsers.users.forEach(coordinator => {
                coordinatorRecords.push([
                { text: coordinator.firstName },
                { text: coordinator.lastName },
                { text: coordinator.email },
                { text: coordinator.cardType === '1' ? `V-${coordinator.cardId}`
                : coordinator.cardType === '2' ? `J-${coordinator.cardId}` : `E-${coordinator.cardId}` },
                { text: coordinator.phone },
                { text: coordinator.homePhone },
                { text: coordinator.addressState },
                { text: coordinator.addressMunicipality },
                { text: coordinator.address },
                { text: coordinator.addressHome },
                { text: coordinator.instructed ? 'Completado' : 'Sin completar' },
                { text: coordinator.profession },
                { text: coordinator.schools },
                { text: coordinator.status === '1' ? 'Activo' : 'Inactivo' },
                ]);
            });

            coordinatorRecords.unshift( coordinatorHeaderRecord );

            finalReport.content.push({
                table: {
                    widths: '7%',
                    body: coordinatorRecords,
                    layout: this.borderCustom
                },
                margin: [0, 0, 0, 30]
            });
        } else if ( dataUsers.typeUser === '2' ) {

            finalReport.defaultStyle.fontSize = 7.4;

            const schoolRecords: any = [];

            const schoolHeaderRecord: any = [
                { ...colorHeaderRow, text: 'Nombre' },
                { ...colorHeaderRow, text: 'Código' },
                { ...colorHeaderRow, text: 'Correo' },
                { ...colorHeaderRow, text: 'Teléfono' },
                { ...colorHeaderRow, text: 'Estado' },
                { ...colorHeaderRow, text: 'Municipio' },
                { ...colorHeaderRow, text: 'Ciudad' },
                { ...colorHeaderRow, text: 'Calles / carrerass' },
                { ...colorHeaderRow, text: 'Zona' },
                { ...colorHeaderRow, text: 'Dirección de la zona' },
                { ...colorHeaderRow, text: 'N° de grados' },
                { ...colorHeaderRow, text: 'N° de secciones' },
                { ...colorHeaderRow, text: 'Padrino' },
                { ...colorHeaderRow, text: 'Coordinador' },
                { ...colorHeaderRow, text: 'Estatus' },
            ];

            // -- Inser the records
            dataUsers.users.forEach(school => {
                schoolRecords.push([
                { text: school.name },
                { text: school.code },
                { text: school.email },
                { text: school.phone },
                { text: school.addressState },
                { text: school.addressMunicipality },
                { text: school.addressCity },
                { text: school.address },
                { text: `${school.addressZoneType}` },
                { text: school.addressZone },
                { text: school.nGrades },
                { text: school.nSections },
                { text: school.sponsor },
                { text: school.coordinator },
                { text: school.status === '1' ? 'Activo' : 'Inactivo' },
                ]);
            });

            schoolRecords.unshift( schoolHeaderRecord );

            finalReport.content.push({
                table: {
                    widths: '6.6%',
                    body: schoolRecords,
                    layout: this.borderCustom
                },
                margin: [0, 0, 0, 30]
            });
        } else if (dataUsers.typeUser === '3') {


            const teacherRecords: any = [];

            const teacherHeaderRecord: any = [
                { ...colorHeaderRow, text: 'Nombre' },
                { ...colorHeaderRow, text: 'Apellido' },
                { ...colorHeaderRow, text: 'Identificación' },
                { ...colorHeaderRow, text: 'Género' },
                { ...colorHeaderRow, text: 'Correo' },
                { ...colorHeaderRow, text: 'Teléfono' },
                { ...colorHeaderRow, text: 'Estado' },
                { ...colorHeaderRow, text: 'Municipio' },
                { ...colorHeaderRow, text: 'Ciudad' },
                { ...colorHeaderRow, text: 'Calles / carrerass' },
                { ...colorHeaderRow, text: 'Estatus' },
            ];

            // -- Inser the records
            dataUsers.users.forEach(teacher => {
                teacherRecords.push([
                { text: teacher.firstName },
                { text: teacher.lastName },
                { text: teacher.cardType === '1' ? `V-${teacher.cardId}`
                : teacher.cardType === '2' ? `J-${teacher.cardId}` : `E-${teacher.cardId}` },
                { text: teacher.gender === '1' ? 'Femenino' : 'Masculino' },
                { text: teacher.email },
                { text: teacher.phone },
                { text: teacher.addressState },
                { text: teacher.addressMunicipality },
                { text: teacher.addressCity },
                { text: teacher.address },
                { text: teacher.status === '1' ? 'Activo' : 'Inactivo' },
            ]);
            });

            teacherRecords.unshift( teacherHeaderRecord );

            finalReport.content.push({
                table: {
                    widths: '9%',
                    body: teacherRecords,
                    layout: this.borderCustom
                },
                margin: [0, 0, 0, 30]
            });
        }

        finalReport.content.unshift( headerDocument );

        pdfMake.createPdf(finalReport).open();
    }

    /**
     *  Diagnostic report
     */

    async onGenerate(report: DiagnosticReport) {

        const finalReport: any = {
            info: {
                title: 'Reporte de diagnósticos',
                author: 'Binaural C.A',
                subject: 'Reporte de diagnósticos',
                keywords: 'Reporte, diagnósticos, lectura, lógica, matemática',
            },
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
            layout: this.borderCustom,
            margin: [0, 0, 0, 30]
        };

        // -- / End header document --

        /**
         * The maximum number of column is 9
         */

        const tableLapseOne: any = [];
        const tableLapseTwo: any = [];
        const tableLapseThree: any = [];

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
                    [{ ...colorRowTwo, text: 'Estudiantes participantes:' }],
                    [{ text: 'Promedio del resultado:' }],
                    [{ ...colorRowOne, text: 'Estudiantes sobre la meta:' }],
                    [{ ...colorRowTwo, text: 'Porcentaje sobre la meta:' }],
                    [{ text: 'Promedio del índice:' }],
                ];

                // -- Creating table students --
                section.lapse1.students.forEach((student, key) => {

                    // -- Initial data --
                    prepareStudent = [
                        { text: student.firstName },
                        { text: student.lastName },
                        { text: `${student.cardType === '1' ? 'V' : 'E'}-${student.cardId}` },
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

                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de multiplicación' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse1.math.participants });
                    diagnosticResult[2].push({ text: section.lapse1.math.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse1.math.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse1.math.overGoalAverage });
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


                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de lectura' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse1.reading.participants });
                    diagnosticResult[2].push({ text: section.lapse1.reading.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse1.reading.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse1.reading.overGoalAverage });
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


                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de razonamiento lógico - mtemático' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse1.logic.participants });
                    diagnosticResult[2].push({ text: section.lapse1.logic.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse1.logic.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse1.logic.overGoalAverage });
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
                    layout: this.borderCustom,
                    margin: [0, 0, 0, 30]
                });

                // -- Diagnostic --
                tableLapseOne.push({
                    table: {
                        widths: 'auto',
                        body: diagnosticResult
                    },
                    layout: this.borderCustom,
                    margin: [0, 0, 0, 30]
                });
            }

            if (section.lapse2.available) {

                // -- Prepare table header --

                let firstRowHeaderTable: any = [
                    { text: 'Grado: ' },
                    { text: section.grade, colSpan: 2 },
                    { text: `` }
                ];

                let penultimateRowHeaderTable: any = [
                    { text: 'Sección: ' },
                    { text: section.name },
                    { text: `Lapso: 2` }
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
                    [{ ...colorRowTwo, text: 'Estudiantes participantes:' }],
                    [{ text: 'Promedio del resultado:' }],
                    [{ ...colorRowOne, text: 'Estudiantes sobre la meta:' }],
                    [{ ...colorRowTwo, text: 'Porcentaje sobre la meta:' }],
                    [{ text: 'Promedio del índice:' }],
                ];

                // -- Creating table students --
                section.lapse2.students.forEach((student, key) => {

                    // -- Initial data --
                    prepareStudent = [
                        { text: student.firstName },
                        { text: student.lastName },
                        { text: `${student.cardType === '1' ? 'V' : 'E'}-${student.cardId}` },
                    ];

                    // =======================
                    // Columns

                    if (section.lapse2.math !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.multiplicationsPerMin },
                            { text: student.multiplicationsPerMinIndex },
                        ];
                    }

                    if (section.lapse2.reading !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.wordsPerMin },
                            { text: student.wordsPerMinIndex },
                        ];

                    }

                    if (section.lapse2.logic !== undefined) {
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

                if (section.lapse2.math !== undefined) {

                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de multiplicación' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse2.math.participants });
                    diagnosticResult[2].push({ text: section.lapse2.math.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse2.math.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse2.math.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse2.math.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse2.math.goal}`, colSpan: 2 },
                        {}
                    ];


                    const datePrepare: any = section.lapse2.math.lastTestDate === '' ? ''
                        : formatDate(section.lapse2.math.lastTestDate, 'd MMMM y', 'es-VE');
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

                if (section.lapse2.reading !== undefined) {


                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de lectura' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse2.reading.participants });
                    diagnosticResult[2].push({ text: section.lapse2.reading.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse2.reading.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse2.reading.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse2.reading.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse2.reading.goal}`, colSpan: 2 },
                        {}
                    ];

                    const datePrepare: any = section.lapse2.reading.lastTestDate === '' ? ''
                        : formatDate(section.lapse2.reading.lastTestDate, 'd MMMM y', 'es-VE');
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

                if (section.lapse2.logic !== undefined) {


                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de razonamiento lógico - mtemático' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse2.logic.participants });
                    diagnosticResult[2].push({ text: section.lapse2.logic.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse2.logic.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse2.logic.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse2.logic.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse2.logic.goal}`, colSpan: 2 },
                        {}
                    ];

                    const datePrepare: any = section.lapse2.logic.lastTestDate === '' ? ''
                        : formatDate(section.lapse2.logic.lastTestDate, 'd MMMM y', 'es-VE');
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
                tableLapseTwo.push({
                    table: {
                        body: allStudent
                    },
                    layout: this.borderCustom,
                    margin: [0, 0, 0, 30]
                });

                // -- Diagnostic --
                tableLapseTwo.push({
                    table: {
                        widths: 'auto',
                        body: diagnosticResult
                    },
                    layout: this.borderCustom,
                    margin: [0, 0, 0, 30]
                });
            }


            if (section.lapse3.available) {

                // -- Prepare table header --

                let firstRowHeaderTable: any = [
                    { text: 'Grado: ' },
                    { text: section.grade, colSpan: 2 },
                    { text: `` }
                ];

                let penultimateRowHeaderTable: any = [
                    { text: 'Sección: ' },
                    { text: section.name },
                    { text: `Lapso: 3` }
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
                    [{ ...colorRowTwo, text: 'Estudiantes participantes:' }],
                    [{ text: 'Promedio del resultado:' }],
                    [{ ...colorRowOne, text: 'Estudiantes sobre la meta:' }],
                    [{ ...colorRowTwo, text: 'Porcentaje sobre la meta:' }],
                    [{ text: 'Promedio del índice:' }],
                ];

                // -- Creating table students --
                section.lapse3.students.forEach((student, key) => {

                    // -- Initial data --
                    prepareStudent = [
                        { text: student.firstName },
                        { text: student.lastName },
                        { text: `${student.cardType === '1' ? 'V' : 'E'}-${student.cardId}` },
                    ];

                    // =======================
                    // Columns

                    if (section.lapse3.math !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.multiplicationsPerMin },
                            { text: student.multiplicationsPerMinIndex },
                        ];
                    }

                    if (section.lapse3.reading !== undefined) {
                        prepareStudent = [
                            ...prepareStudent,
                            { text: student.wordsPerMin },
                            { text: student.wordsPerMinIndex },
                        ];

                    }

                    if (section.lapse3.logic !== undefined) {
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

                if (section.lapse3.math !== undefined) {

                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de multiplicación' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse3.math.participants });
                    diagnosticResult[2].push({ text: section.lapse3.math.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse3.math.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse3.math.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse3.math.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse3.math.goal}`, colSpan: 2 },
                        {}
                    ];


                    const datePrepare: any = section.lapse3.math.lastTestDate === '' ? ''
                        : formatDate(section.lapse3.math.lastTestDate, 'd MMMM y', 'es-VE');
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

                if (section.lapse3.reading !== undefined) {


                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de lectura' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse3.reading.participants });
                    diagnosticResult[2].push({ text: section.lapse3.reading.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse3.reading.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse3.reading.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse3.reading.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse3.reading.goal}`, colSpan: 2 },
                        {}
                    ];

                    const datePrepare: any = section.lapse3.reading.lastTestDate === '' ? ''
                        : formatDate(section.lapse3.reading.lastTestDate, 'd MMMM y', 'es-VE');
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

                if (section.lapse3.logic !== undefined) {


                    diagnosticResult[0].push({ ...colorRowOne, text: 'Diagnóstico de razonamiento lógico - mtemático' });
                    diagnosticResult[1].push({ ...colorRowTwo, text: section.lapse3.logic.participants });
                    diagnosticResult[2].push({ text: section.lapse3.logic.resultAverage });
                    diagnosticResult[3].push({ ...colorRowOne, text: section.lapse3.logic.overGoalStudents });
                    diagnosticResult[4].push({ ...colorRowTwo, text: section.lapse3.logic.overGoalAverage });
                    diagnosticResult[5].push({ text: section.lapse3.logic.indexAverage });

                    columnsNameStudent = [
                        ...columnsNameStudent,
                        { ...colorRowTwo, text: 'Resultado' },
                        { ...colorRowTwo, text: 'Índice' },
                    ];

                    latestRowHeaderTable = [
                        ...latestRowHeaderTable,
                        { ...colorRowOne, text: `Meta: ${section.lapse3.logic.goal}`, colSpan: 2 },
                        {}
                    ];

                    const datePrepare: any = section.lapse3.logic.lastTestDate === '' ? ''
                        : formatDate(section.lapse3.logic.lastTestDate, 'd MMMM y', 'es-VE');
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
                tableLapseThree.push({
                    table: {
                        body: allStudent
                    },
                    layout: this.borderCustom,
                    margin: [0, 0, 0, 30]
                });

                // -- Diagnostic --
                tableLapseThree.push({
                    table: {
                        widths: 'auto',
                        body: diagnosticResult
                    },
                    layout: this.borderCustom,
                    margin: [0, 0, 0, 30]
                });
            }



        });


        // ===========================================
        // -- Set body all table lapse and sections --
        // ===========================================
        finalReport.content.push(tableLapseOne);
        finalReport.content.push(tableLapseTwo);
        finalReport.content.push(tableLapseThree);
        finalReport.content.unshift(documentSubHeaderData);
        finalReport.content.unshift(titleDocument);
        pdfMake.createPdf(finalReport).open();
    }

}