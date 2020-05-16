import { Inject } from '@angular/core';
import { DOCUMENT, DatePipe } from '@angular/common';
import { IMAGE } from '../img-base-64';
import { OlympicsReport } from 'src/app/models/report/math-olympics-report.model';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PDFReportMath {

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe, ) { }

    async generateMathOlympics(mockData: OlympicsReport ) {

        // -- Mock data --

        // const mockData: any = {
        //     allPeriods: [
        //         {
        //             academicPeriod: ['2016', '2017'],
        //             schools: [
        //                 {
        //                     meta: {
        //                         name: 'Rafael',
        //                         coordinator: 'Jose',
        //                         sponsor: 'Coca cola'
        //                     },
        //                     grades: [
        //                         {
        //                             name: '1',
        //                             sections: [
        //                                 {
        //                                     name: 'A',
        //                                     inscribed: 3,
        //                                     classified: 9,
        //                                     medalsGold: 10,
        //                                     medalsSilver: 9,
        //                                     medalsBronze: 9
        //                                 },
        //                                 {
        //                                     name: 'B',
        //                                     inscribed: 3,
        //                                     classified: 9,
        //                                     medalsGold: 10,
        //                                     medalsSilver: 9,
        //                                     medalsBronze: 9
        //                                 }
        //                             ]
        //                         }
        //                     ],
        //                     total: {
        //                         totalEnrolled: 20,
        //                         totalClassified: 10,
        //                         totalGoldMedals: 10,
        //                         totalSilverMedals: 10,
        //                         totalBronzeMedals: 10,
        //                     }
        //                 },

        //             ],

        //         },
        //         {
        //             academicPeriod: ['2017', '2018'],
        //             schools: [
        //                 {
        //                     meta: {
        //                         name: 'Maestra',
        //                         coordinator: 'Jose',
        //                         sponsor: 'Pepsi cola'
        //                     },
        //                     grades: [
        //                         {
        //                             name: '1',
        //                             sections: [
        //                                 {
        //                                     name: 'A',
        //                                     inscribed: 3,
        //                                     classified: 9,
        //                                     medalsGold: 10,
        //                                     medalsSilver: 9,
        //                                     medalsBronze: 9
        //                                 },
        //                             ]
        //                         },
        //                         {
        //                             name: '2',
        //                             sections: [
        //                                 {
        //                                     name: 'B',
        //                                     inscribed: 3,
        //                                     classified: 9,
        //                                     medalsGold: 10,
        //                                     medalsSilver: 9,
        //                                     medalsBronze: 9
        //                                 },
        //                             ]
        //                         },
        //                     ],
        //                     total: {
        //                         totalEnrolled: 20,
        //                         totalClassified: 10,
        //                         totalGoldMedals: 10,
        //                         totalSilverMedals: 10,
        //                         totalBronzeMedals: 10,
        //                     }
        //                 }
        //             ],

        //         },
        //     ],
        //     finalScore: {
        //         enrolledStudents: 100,
        //         classifiedStudents: 80,
        //         studentsGoldMedal: 10,
        //         studentsSilverMedal: 20,
        //         studentsBronzeMedal: 20,
        //     }
        // };

        // -- / End --

        const colorHeaderRow: any = { fillColor: '#42b16a', color: '#FFF', bold: true };
        const colorHeaderSecondary: any = { fillColor: '#2e8aaa', color: '#FFF', bold: true };

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
        ];

        const finalDocument: any = {
            info: {
                title: 'Reporte de usuarios',
                author: 'Binaural C.A',
                subject: 'Reporte de usuarios',
                keywords: 'Reporte, usuarios, padrino, coordinador, docente, escuela, estudiante',
            },
            pageSize: 'A4',
            content: [
                documentHeader,
            ],
            defaultStyle: {
                fontSize: 12,
            }
        };


        /**
         * Insert the records bo
         */
        const records: any = [];

        mockData.allPeriods.forEach(period => {

            records.push({
                margin: [0, 0, 0, 10],
                bold: true,
                fontSize: 14,
                text: `Período académico: ${period.academicPeriod[0]} - ${period.academicPeriod[1]}`
            });

            period.schools.forEach(school => {

                const meta: any = {
                    alialignment: 'left',
                    columns: [
                        {
                            margin: [0, 0, 0, 10], bold: true, text: `Escuela: ${school.meta.name}`
                        },
                        {
                            margin: [0, 0, 0, 10], bold: true, text: `Coordinador: ${school.meta.coordinator}`
                        },
                        {
                            margin: [0, 0, 0, 10], bold: true, text: `Padrino: ${school.meta.sponsor}`
                        },
                    ]
                };

                const tableSchools: any = [
                    meta,
                    {
                        table: {
                            body: [
                                [
                                    { ...colorHeaderRow, text: 'Grado' },
                                    { ...colorHeaderRow, text: 'Sección' },
                                    { ...colorHeaderRow, text: 'Inscritos' },
                                    { ...colorHeaderRow, text: 'Clasificados' },
                                    { ...colorHeaderRow, text: 'Medalla de oro' },
                                    { ...colorHeaderRow, text: 'Medalla de plata' },
                                    { ...colorHeaderRow, text: 'Medalla de bronce' },
                                ]
                            ]
                        },
                        margin: [0, 0, 0, 20]
                    }
                ];

                const tableSchoolsResult: any = [
                    {
                        table: {
                            widths: '*',
                            body: [
                                [
                                    { ...colorHeaderSecondary, text: '' },
                                    { ...colorHeaderSecondary, text: 'Inscritos' },
                                    { ...colorHeaderSecondary, text: 'Clasificados' },
                                    { ...colorHeaderSecondary, text: 'Medallas de oro' },
                                    { ...colorHeaderSecondary, text: 'Medallas de plata' },
                                    { ...colorHeaderSecondary, text: 'Medallas de bronce' },
                                ],
                                [
                                    { ...colorHeaderSecondary, text: 'Total:' },
                                    { ...colorHeaderSecondary, text: school.total.totalEnrolled },
                                    { ...colorHeaderSecondary, text: school.total.totalClassified },
                                    { ...colorHeaderSecondary, text: school.total.totalGoldMedals },
                                    { ...colorHeaderSecondary, text: school.total.totalSilverMedals },
                                    { ...colorHeaderSecondary, text: school.total.totalBronzeMedals },

                                ]
                            ]
                        },
                        margin: [0, 0, 0, 30]
                    }
                ];

                school.grades.forEach(grade => {
                    grade.sections.forEach(section => {
                        tableSchools[1].table.body.push([
                            { text: grade.name, rowSpan: grade.sections.length },
                            { text: section.name },
                            { text: section.inscribed },
                            { text: section.classified },
                            { text: section.medalsGold },
                            { text: section.medalsSilver },
                            { text: section.medalsBronze },
                        ]);
                    });
                });

                records.push(tableSchools);
                records.push(tableSchoolsResult);
            });
        });

        // -- Total final sum --

        const totalFinalSum: any = [
            {
                width: '*',
                text: 'Resultados de todas las escuelas',
                color: '#2e8aaa',
                alignment: 'center',
                fontSize: 15,
                bold: true,
                margin: [0, 65],
            },
            {
                table: {
                    widths: '60%',
                    body: [
                        [{ ...colorHeaderRow, text: `Estudiantes inscritos: ${mockData.finalScore.enrolledStudents}` }],
                        [{ ...colorHeaderSecondary, text: `Estudiantes clasificados: ${mockData.finalScore.classifiedStudents}` }],
                        [{ text: `Estudiantes con medalla de oro: ${mockData.finalScore.studentsGoldMedal}` }],
                        [{
                            ...colorHeaderRow,
                            text: `Estudiantes con medalla de plata: ${mockData.finalScore.studentsSilverMedal}`
                        }],
                        [{
                            ...colorHeaderSecondary,
                            text: `Estudiantes con medalla de bronce: ${mockData.finalScore.studentsBronzeMedal}`
                        }],
                    ]
                }
            }
        ];

        records.push(totalFinalSum);

        // -- End total final sum --

        finalDocument.content.push(records);

        pdfMake.createPdf(finalDocument).open();
    }
}
