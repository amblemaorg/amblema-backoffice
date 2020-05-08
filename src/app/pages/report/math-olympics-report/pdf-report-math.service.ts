import { Inject } from '@angular/core';
import { DOCUMENT, DatePipe } from '@angular/common';
import { IMAGE } from '../img-base-64';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PDFReportMath {

    constructor(@Inject(DOCUMENT) private document: any, private datePipe: DatePipe, ) { }

    async generateMathOlympics() {

        // -- Mock data --

        const mockData: any = {
            allPeriods: [
                {
                    academicPeriod: ['2016', '2017'],
                    schools: [
                        {
                            meta: {
                                name: 'Rafael',
                                coordinator: 'Jose',
                                sponsor: 'Coca cola'
                            },
                            grades: [
                                {
                                    name: '1',
                                    sections: [
                                        {
                                            name: 'A',
                                            inscribed: 3,
                                            classified: 9,
                                            medalsGold: 10,
                                            medalsSilver: 9,
                                            medalsBronze: 9
                                        },
                                        {
                                            name: 'B',
                                            inscribed: 3,
                                            classified: 9,
                                            medalsGold: 10,
                                            medalsSilver: 9,
                                            medalsBronze: 9
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    total: {
                        totalEnrolled: 20,
                        totalClassified: 10,
                        totalGoldMedals: 10,
                        totalSilverMedals: 10,
                        totalBronzeMedals: 10,
                    }
                },
                {
                    academicPeriod: ['2017', '2018'],
                    schools: [
                        {
                            meta: {
                                name: 'Maestra',
                                coordinator: 'Jose',
                                sponsor: 'Pepsi cola'
                            },
                            grades: [
                                {
                                    name: '1',
                                    sections: [
                                        {
                                            name: 'A',
                                            inscribed: 3,
                                            classified: 9,
                                            medalsGold: 10,
                                            medalsSilver: 9,
                                            medalsBronze: 9
                                        },
                                    ]
                                },
                                {
                                    name: '2',
                                    sections: [
                                        {
                                            name: 'B',
                                            inscribed: 3,
                                            classified: 9,
                                            medalsGold: 10,
                                            medalsSilver: 9,
                                            medalsBronze: 9
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    total: {
                        totalEnrolled: 20,
                        totalClassified: 10,
                        totalGoldMedals: 10,
                        totalSilverMedals: 10,
                        totalBronzeMedals: 10,
                    }
                },
            ],
            finalScore: {
                enrolledStudents: 100,
                classifiedStudents: 80,
                studentsGoldMedal: 10,
                studentsSilverMedal: 20,
                studentsBronzeMedal: 20,
            }
        };

        // -- / End --

        const colorHeaderRow: any = { fillColor: '#42b16a', color: '#FFF', bold: true };

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

            records.push( {
                margin: [0, 0, 0, 10],
                bold: true,
                fontSize: 14,
                text: `Período académico: ${period.academicPeriod[0]} - ${period.academicPeriod[1]}` } );

            period.schools.forEach( school => {

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
                                    { ...colorHeaderRow, text: 'Clasificados'},
                                    { ...colorHeaderRow, text: 'Medalla de oro' },
                                    { ...colorHeaderRow, text: 'Medalla de plata' },
                                    { ...colorHeaderRow, text: 'Medalla de bronce' },
                                ]
                            ]
                        }, 
                        margin: [0,0,0,30]
                    }
                    
                ];

                school.grades.forEach( grade => {
                    

                });

                records.push(tableSchools);
            });
        });

        finalDocument.content.push(records);

        pdfMake.createPdf(finalDocument).open();
    }
}
