import { Inject, Injectable } from "@angular/core";
import { DOCUMENT, DatePipe } from "@angular/common";
import { IMAGE } from "../img-base-64";
import { OlympicsReport } from "src/app/_models/report/math-olympics-report.model";
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PDFReportMath {
  borderCustom = {
    hLineColor(i, node) {
      return "#00722e";
    },
    vLineColor(i, node) {
      return "#00722e";
    },
  };

  constructor(
    @Inject(DOCUMENT) private document: any,
    private datePipe: DatePipe
  ) { }

  async generateMathOlympics(mockData: OlympicsReport, title: string = "Reporte de las olimpíadas de matemáticas") {
    const colorHeaderRow: any = {
      fillColor: "#81b03e",
      color: "#FFF",
      bold: true,
    };
    const colorHeaderSecondary: any = {
      fillColor: "#00809a",
      color: "#FFF",
      bold: true,
    };

    const documentHeader: any = [
      {
        image: IMAGE,
        width: 100,
        absolutePosition: { x: 30, y: 60 },
      },
      {
        alignment: "center",
        columns: [
          {
            width: "*",
            text: title,
            color: "#2e8aaa",
            alignment: "center",
            fontSize: 15,
            bold: true,
            margin: [0, 65],
          },
        ],
      },
    ];

    const finalDocument: any = {
      info: {
        title: title,
        author: "Fundación AmbLeMa",
        subject: title,
        keywords:
          "Reporte, usuarios, padrino, coordinador, docente, escuela, estudiante",
      },
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [documentHeader],
      defaultStyle: {
        fontSize: 12,
      },
    };

    /**
     * Insert the records bo
     */
    const records: any = [];

    mockData.allPeriods.forEach((period) => {
      records.push({
        margin: [0, 0, 0, 10],
        bold: true,
        fontSize: 14,
        text: `Período académico: ${period.academicPeriod[0]} - ${period.academicPeriod[1]}`,
      });

      period.schools.forEach((school) => {
        const meta: any = {
          alialignment: "left",
          columns: [
            {
              margin: [0, 0, 0, 10],
              bold: true,
              text: `Escuela: ${school.meta.name}`,
            },
            {
              margin: [0, 0, 0, 10],
              bold: true,
              text: `Coordinador: ${school.meta.coordinator}`,
            },
            {
              margin: [0, 0, 0, 10],
              bold: true,
              text: `Padrino: ${school.meta.sponsor}`,
            },
          ],
        };

        const tableSchools: any = [
          meta,
          {
            table: {
              body: [
                [
                  { ...colorHeaderRow, text: "Grado", rowSpan: 2, alignment: "center" },
                  { ...colorHeaderRow, text: "Sección", rowSpan: 2, alignment: "center" },
                  { ...colorHeaderRow, text: "Inscritos", rowSpan: 2, alignment: "center" },
                  { ...colorHeaderRow, text: "Olimpiadas Regionales", colSpan: 4, alignment: "center" },
                  {},
                  {},
                  {},
                  { ...colorHeaderRow, text: "Olimpiadas Nacionales", colSpan: 4, alignment: "center" },
                  {},
                  {},
                  {},
                ],
                [
                  {},
                  {},
                  {},
                  { ...colorHeaderRow, text: "Clasificados" },
                  { ...colorHeaderRow, text: "Oro" },
                  { ...colorHeaderRow, text: "Plata" },
                  { ...colorHeaderRow, text: "Bronce" },
                  { ...colorHeaderRow, text: "Clasificados" },
                  { ...colorHeaderRow, text: "Oro" },
                  { ...colorHeaderRow, text: "Plata" },
                  { ...colorHeaderRow, text: "Bronce" },
                ],
              ],
            },
            layout: this.borderCustom,
            margin: [0, 0, 0, 20],
          },
        ];

        const tableSchoolsResult: any = [
          {
            table: {
              widths: "*",
              body: [
                [
                  { ...colorHeaderSecondary, text: "" },
                  { ...colorHeaderSecondary, text: "Inscritos" },
                  { ...colorHeaderSecondary, text: "Clasificados (Reg)" },
                  { ...colorHeaderSecondary, text: "Medallas de oro (Reg)" },
                  { ...colorHeaderSecondary, text: "Medallas de plata (Reg)" },
                  { ...colorHeaderSecondary, text: "Medallas de bronce (Reg)" },
                  { ...colorHeaderSecondary, text: "Clasificados (Nac)" },
                  { ...colorHeaderSecondary, text: "Medallas de oro (Nac)" },
                  { ...colorHeaderSecondary, text: "Medallas de plata (Nac)" },
                  { ...colorHeaderSecondary, text: "Medallas de bronce (Nac)" },
                ],
                [
                  { ...colorHeaderSecondary, text: "Total:" },
                  { ...colorHeaderSecondary, text: school.total.totalEnrolled },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalClassified,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalGoldMedals,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalSilverMedals,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalBronzeMedals,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalClassifiedNational,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalGoldMedalsNational,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalSilverMedalsNational,
                  },
                  {
                    ...colorHeaderSecondary,
                    text: school.total.totalBronzeMedalsNational,
                  },
                ],
              ],
            },
            layout: this.borderCustom,
            margin: [0, 0, 0, 30],
          },
        ];

        school.grades.forEach((grade) => {
          grade.sections.forEach((section) => {
            tableSchools[1].table.body.push([
              { text: grade.name, rowSpan: grade.sections.length },
              { text: section.name },
              { text: section.inscribed },
              { text: section.classified },
              { text: section.medalsGold },
              { text: section.medalsSilver },
              { text: section.medalsBronze },
              { text: section.classifiedNational },
              { text: section.medalsGoldNational },
              { text: section.medalsSilverNational },
              { text: section.medalsBronzeNational },
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
        width: "*",
        text: "Resultados de todas las escuelas",
        color: "#2e8aaa",
        alignment: "center",
        fontSize: 15,
        bold: true,
        margin: [0, 65],
      },
      {
        table: {
          widths: "60%",
          body: [
            [
              {
                ...colorHeaderRow,
                text: `Estudiantes inscritos: ${mockData.finalScore.enrolledStudents}`,
              },
            ],
            [
              {
                ...colorHeaderSecondary,
                text: `Estudiantes clasificados (Reg): ${mockData.finalScore.classifiedStudents}`,
              },
            ],
            [
              {
                text: `Estudiantes medalla de oro (Reg): ${mockData.finalScore.studentsGoldMedal}`,
              },
            ],
            [
              {
                ...colorHeaderRow,
                text: `Estudiantes medalla de plata (Reg): ${mockData.finalScore.studentsSilverMedal}`,
              },
            ],
            [
              {
                ...colorHeaderSecondary,
                text: `Estudiantes medalla de bronce (Reg): ${mockData.finalScore.studentsBronzeMedal}`,
              },
            ],
            [
              {
                ...colorHeaderSecondary,
                text: `Estudiantes clasificados (Nac): ${mockData.finalScore.classifiedStudentsNational}`,
              },
            ],
            [
              {
                text: `Estudiantes medalla de oro (Nac): ${mockData.finalScore.studentsGoldMedalNational}`,
              },
            ],
            [
              {
                ...colorHeaderRow,
                text: `Estudiantes medalla de plata (Nac): ${mockData.finalScore.studentsSilverMedalNational}`,
              },
            ],
            [
              {
                ...colorHeaderSecondary,
                text: `Estudiantes medalla de bronce (Nac): ${mockData.finalScore.studentsBronzeMedalNational}`,
              },
            ],
          ],
        },

        layout: this.borderCustom,
      },
    ];

    records.push(totalFinalSum);

    // -- End total final sum --

    finalDocument.content.push(records);

    pdfMake.createPdf(finalDocument).open();
  }
}
