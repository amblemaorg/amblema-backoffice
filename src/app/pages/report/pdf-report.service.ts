import { PdfMakeWrapper } from "pdfmake-wrapper";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { OnInit, Inject, Injectable } from "@angular/core";
import { DOCUMENT, DatePipe, formatDate } from "@angular/common";
import { IMAGE } from "./img-base-64";

@Injectable()
export class PDFReport implements OnInit {
  wait = false;

  logoBase64 = ``;

  pdf = new PdfMakeWrapper();

  borderCustom = {
    hLineColor(i, node) {
      return "#00722e";
    },
    vLineColor(i, node) {
      return "#00722e";
    },
  };

  borderCustomWithLessPadding = {
    hLineColor(i, node) {
      return "#00722e";
    },
    vLineColor(i, node) {
      return "#00722e";
    },
    paddingLeft(i, node) {
      return 2;
    },
    paddingRight(i, node) {
      return 2;
    },
    paddingTop(i, node) {
      return 2;
    },
    paddingBottom(i, node) {
      return 2;
    },
  };

  ngOnInit(): void {
    //  Margin
    this.pdf.pageSize("A4");
  }

  constructor(
    @Inject(DOCUMENT) private document: any,
    private datePipe: DatePipe
  ) { }

  /**
   * User report
   */

  async generateUserReport(dataUsers: any) {
    const finalReport: any = {
      info: {
        title: "Reporte de usuarios",
        author: "Fundación AmbLeMa",
        subject: "Reporte de usuarios",
        keywords:
          "Reporte, usuarios, padrino, coordinador, docente, escuela, estudiante",
      },
      pageOrientation: "landscape",
      pageSize: "A4",
      content: [],
      defaultStyle: {
        fontSize: 8,
      },
      footer: function (currentPage, pageCount) {
        return [
          {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "right",
            marginRight: 40,
          },
        ];
      },
    };

    const colorHeaderRow: any = {
      fillColor: "#81b03e",
      color: "#FFF",
      bold: true,
    };

    const headerDocument: any = [
      {
        image: IMAGE,
        width: 100,
        absolutePosition: { x: 30, y: 15 },
      },
      {
        alignment: "center",
        columns: [
          {
            width: "*",
            text:
              dataUsers.typeUser === "0"
                ? "Reporte de Padrinos"
                : dataUsers.typeUser === "1"
                  ? "Reporte de Coordinadores"
                  : dataUsers.typeUser === "2"
                    ? "Reporte de Escuelas"
                    : "Reporte de Docentes",
            color: "#2e8aaa",
            alignment: "center",
            fontSize: 20,
            bold: true,
            margin: [0, 15, 0, 15],
          },
        ],
      },
    ];

    // -- Type user --
    if (dataUsers.typeUser === "0") {
      // Padrino
      const sponsorHeaderRecord: any = [
        { ...colorHeaderRow, text: "N°" },
        { ...colorHeaderRow, text: "Nombre de la empresa" },
        { ...colorHeaderRow, text: "RIF" },
        { ...colorHeaderRow, text: "Correo" },
        { ...colorHeaderRow, text: "Teléfono" },
        { ...colorHeaderRow, text: "Estado" },
        { ...colorHeaderRow, text: "Municipio" },
        { ...colorHeaderRow, text: "Ciudad" },
        { ...colorHeaderRow, text: "Escuela(s) que apadrina" },
        { ...colorHeaderRow, text: "Estatus" },
      ];

      const sponsorRecords: any = [];

      // -- Inser the records
      dataUsers.users.forEach((sponsor, key) => {
        sponsorRecords.push([
          { text: key + 1 },
          { text: sponsor.name },
          { text: sponsor.companyRif },
          { text: sponsor.email },
          { text: sponsor.companyPhone },
          { text: sponsor.addressState },
          { text: sponsor.addressMunicipality },
          { text: sponsor.addressCity },
          { text: sponsor.schools },
          { text: sponsor.status === "1" ? "Activo" : "Inactivo" },
        ]);
      });

      sponsorRecords.unshift(sponsorHeaderRecord);
      finalReport.content.push({
        table: {
          widths: [
            "auto",
            "11%",
            "11%",
            "11%",
            "11%",
            "11%",
            "11%",
            "11%",
            "11%",
            "11%",
          ],
          body: sponsorRecords,
          layout: this.borderCustom,
        },
        layout: this.borderCustom,
        margin: [0, 25, 0, 30],
      });
    } else if (dataUsers.typeUser === "1") {
      // Coordinador
      const coordinatorRecords: any = [];

      const coordinatorHeaderRecord: any = [
        { ...colorHeaderRow, text: "N°" },
        { ...colorHeaderRow, text: "Nombre" },
        { ...colorHeaderRow, text: "Apellido" },
        { ...colorHeaderRow, text: "Correo" },
        { ...colorHeaderRow, text: "Identidad" },
        { ...colorHeaderRow, text: "Teléfono Móvil" },
        { ...colorHeaderRow, text: "Teléfono de habitación" },
        { ...colorHeaderRow, text: "Estado" },
        { ...colorHeaderRow, text: "Municipio" },
        { ...colorHeaderRow, text: "Calles / carreras" },
        { ...colorHeaderRow, text: "Casa / Edificio" },
        { ...colorHeaderRow, text: "AmbLe - Pensum" },
        { ...colorHeaderRow, text: "Profesión" },
        { ...colorHeaderRow, text: "Escuelas" },
        { ...colorHeaderRow, text: "Estatus" },
      ];

      // -- Inser the records
      dataUsers.users.forEach((coordinator, key) => {
        coordinatorRecords.push([
          { text: key + 1 },
          { text: coordinator.firstName },
          { text: coordinator.lastName },
          { text: coordinator.email },
          {
            text:
              coordinator.cardType === "1"
                ? `V-${coordinator.cardId}`
                : coordinator.cardType === "2"
                  ? `J-${coordinator.cardId}`
                  : `E-${coordinator.cardId}`,
          },
          { text: coordinator.phone },
          { text: coordinator.homePhone },
          { text: coordinator.addressState },
          { text: coordinator.addressMunicipality },
          { text: coordinator.address },
          { text: coordinator.addressHome },
          { text: coordinator.instructed ? "Completado" : "Sin completar" },
          { text: coordinator.profession },
          { text: coordinator.schools },
          { text: coordinator.status === "1" ? "Activo" : "Inactivo" },
        ]);
      });

      coordinatorRecords.unshift(coordinatorHeaderRecord);

      finalReport.content.push({
        table: {
          widths: [
            "auto",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
            "7%",
          ],
          body: coordinatorRecords,
        },
        layout: this.borderCustom,
        margin: [0, 25, 0, 30],
      });
    } else if (dataUsers.typeUser === "2") {
      // Escuela
      finalReport.defaultStyle.fontSize = 7.4;

      const schoolRecords: any = [];

      const schoolHeaderRecord: any = [
        { ...colorHeaderRow, text: "N°" },
        { ...colorHeaderRow, text: "Nombre" },
        { ...colorHeaderRow, text: "Código" },
        { ...colorHeaderRow, text: "Correo" },
        { ...colorHeaderRow, text: "Teléfono" },
        { ...colorHeaderRow, text: "Estado" },
        { ...colorHeaderRow, text: "Municipio" },
        { ...colorHeaderRow, text: "Ciudad" },
        { ...colorHeaderRow, text: "Calles / carreras" },
        { ...colorHeaderRow, text: "Zona" },
        { ...colorHeaderRow, text: "Dirección de la zona" },
        { ...colorHeaderRow, text: "N° de grados" },
        { ...colorHeaderRow, text: "N° secciones" },
        { ...colorHeaderRow, text: "N° Admin" },
        { ...colorHeaderRow, text: "N° Obreros" },
        { ...colorHeaderRow, text: "N° Docentes" },
        { ...colorHeaderRow, text: "Mátricula" },
        { ...colorHeaderRow, text: "Padrino" },
        { ...colorHeaderRow, text: "Coordinador" },
        { ...colorHeaderRow, text: "Estatus" },
      ];

      // -- Inser the records
      dataUsers.users.forEach((school, key) => {
        schoolRecords.push([
          { text: key + 1 },
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
          { text: school.nAdministrativeStaff },
          { text: school.nLaborStaff },
          { text: school.nTeachers },
          { text: school.nStudents },
          { text: school.sponsor },
          { text: school.coordinator },
          { text: school.status === "1" ? "Activo" : "Inactivo" },
        ]);
      });

      schoolRecords.unshift(schoolHeaderRecord);

      finalReport.content.push({
        table: {
          widths: [
            "auto",
            "6.6%",
            "5%",
            "6.6%",
            "6.6%",
            "5%",
            "5%",
            "6.6%",
            "6.6%",
            "3%",
            "6%",
            "4%",
            "5%",
            "3%",
            "4%",
            "4%",
            "5%",
            "6%",
            "7%",
            "5%",
          ],
          body: schoolRecords,
        },

        layout: this.borderCustom,
        margin: [0, 25, 0, 30],
      });
    } else if (dataUsers.typeUser === "3") {
      // Docente
      const teacherRecords: any = [];

      const teacherHeaderRecord: any = [
        { ...colorHeaderRow, text: "N°" },

        { ...colorHeaderRow, text: "Nombre" },
        { ...colorHeaderRow, text: "Apellido" },
        { ...colorHeaderRow, text: "Identificación" },
        { ...colorHeaderRow, text: "Género" },
        { ...colorHeaderRow, text: "Correo" },
        { ...colorHeaderRow, text: "Teléfono" },
        { ...colorHeaderRow, text: "Escuela" },
        { ...colorHeaderRow, text: "Estado" },
        { ...colorHeaderRow, text: "Municipio" },
        { ...colorHeaderRow, text: "Ciudad" },
        { ...colorHeaderRow, text: "Calles / carreras" },
        { ...colorHeaderRow, text: "Grado de instrucción" },
        { ...colorHeaderRow, text: "Cargo" },
        { ...colorHeaderRow, text: "Estatus" },
      ];

      // -- Inser the records
      dataUsers.users.forEach((teacher, key) => {
        teacherRecords.push([
          { text: key + 1 },
          { text: teacher.firstName },
          { text: teacher.lastName },
          {
            text:
              teacher.cardType === "1"
                ? `V-${teacher.cardId}`
                : teacher.cardType === "2"
                  ? `J-${teacher.cardId}`
                  : `E-${teacher.cardId}`,
          },
          { text: teacher.gender === "1" ? "Femenino" : "Masculino" },
          { text: teacher.email },
          { text: teacher.phone },
          { text: teacher.schoolName },
          { text: teacher.addressState },
          { text: teacher.addressMunicipality },
          { text: teacher.addressCity },
          { text: teacher.address },
          { text: teacher.specialty.name },
          { text: teacher.workPosition.name },
          { text: teacher.status === "1" ? "Activo" : "Inactivo" },
        ]);
      });

      teacherRecords.unshift(teacherHeaderRecord);

      finalReport.content.push({
        table: {
          widths: [
            "auto",
            "7.5%",
            "7.5%",
            "7.5%",
            "6%",
            "8.9%",
            "7.9%",
            "9.2%",
            "6%",
            "6%",
            "6%",
            "7.5%",
            "7.5%",
            "5%",
            "5%",
          ],
          body: teacherRecords,
        },

        layout: this.borderCustom,
        margin: [0, 25, 0, 30],
      });
    }

    finalReport.content.unshift(headerDocument);

    const dateFormatted = formatDate(new Date(), 'dd-MM-yyyy-HH-mm', 'es-VE');
    const title = dataUsers.typeUser === "0" ? "Reporte de Padrinos"
      : dataUsers.typeUser === "1" ? "Reporte de Coordinadores"
        : dataUsers.typeUser === "2" ? "Reporte de Escuelas"
          : "Reporte de Docentes";
    const fileName = `${title}-${dateFormatted}.pdf`;

    pdfMake.createPdf(finalReport).download(fileName);
  }

  /**
   *  Diagnostic report
   */

  async onGenerate(report: DiagnosticReport) {
    const finalReport: any = {
      info: {
        title: "Reporte de diagnósticos",
        author: "Fundación AmbLeMa",
        subject: "Reporte de diagnósticos",
        keywords: "Reporte, diagnósticos, lectura, lógica, matemática, ambiente",
      },
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [],
      defaultStyle: {
        fontSize: 7,
      },
    };

    // -- Title --
    const titleDocument: any = [
      {
        image: IMAGE,
        width: 100,
        absolutePosition: { x: 30, y: 15 },
      },
      {
        alignment: "center",
        columns: [
          {
            width: "*",
            text: "Reporte de diagnósticos",
            color: "#2e8aaa",
            alignment: "center",
            fontSize: 15,
            bold: true,
            margin: [0, 15, 0, 15],
          },
        ],
      },
    ];

    // -- Header document --

    const documentSubHeaderData: any = {
      table: {
        body: [
          [
            { text: "Escuela:" },
            { text: report.school },
            { text: "Fecha:" },
            { text: formatDate(report.date, "d MMMM y", "es-VE") },
          ],
          [
            { text: "Coordinador:" },
            { text: report.coordinator },
            { text: "Período académico:" },
            { text: report.schoolYear },
          ],
        ],
      },
      layout: this.borderCustom,
      margin: [0, 40, 0, 15],
    };

    // -- / End header document --

    const tableTotales: any = [];

    const TableLogicReasoningDiagnosis: any = {
      table: {
        body: [],
        widths: "auto",
      },

      layout: this.borderCustom,
      margin: [0, 0, 0, 40],
    };

    const TableMultiplicationDiagnosis: any = {
      table: {
        body: [],
        widths: "auto",
      },

      layout: this.borderCustom,
      margin: [0, 0, 0, 40],
    };

    const TableReadingDiagnosis: any = {
      table: {
        body: [],
        widths: "auto",
      },

      layout: this.borderCustom,
      margin: [0, 0, 0, 40],
    };

    if (report.yearSummaryAvailable) {
      const FirstHeaderReading: any = [
        {
          fillColor: "#00809a",
          color: "#FFF",
          bold: true,
          text: "Diagnóstico de lectura",
          alignment: "center",
          colSpan: 13,
        },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
      ];

      const SecondHeaderReading: any = [
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "", colSpan: 2 },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 1", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 2", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 3", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "\nMeta\n", rowSpan: 2 },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "\nPorcentaje de mejora\n", rowSpan: 2 },
      ];

      const ThirdHeaderReading: any = [
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Grado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Seccion" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "" },
      ];

      let prepareDataReadingResult: any;
      const allDataReadingResult: any = [];

      allDataReadingResult.push(FirstHeaderReading);
      allDataReadingResult.push(SecondHeaderReading);
      allDataReadingResult.push(ThirdHeaderReading);

      if (report.yearSummary.reading) {
        report.yearSummary.reading.sections.forEach((sec, key) => {
          prepareDataReadingResult = [
            { text: sec.grade },
            { text: sec.name },
          ];

          if (sec.lapse1 !== undefined) {
            prepareDataReadingResult = [
              ...prepareDataReadingResult,
              {
                text:
                  sec.lapse1.resultAverage !== undefined
                    ? sec.lapse1.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse1.indexAverage !== undefined
                    ? sec.lapse1.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse1.overGoalStudents },
            ];
          }

          if (sec.lapse2 !== undefined) {
            prepareDataReadingResult = [
              ...prepareDataReadingResult,
              {
                text:
                  sec.lapse2.resultAverage !== undefined
                    ? sec.lapse2.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse2.indexAverage !== undefined
                    ? sec.lapse2.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse2.overGoalStudents },
            ];
          }

          if (sec.lapse3 !== undefined) {
            prepareDataReadingResult = [
              ...prepareDataReadingResult,
              {
                text:
                  sec.lapse3.resultAverage !== undefined
                    ? sec.lapse3.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse3.indexAverage !== undefined
                    ? sec.lapse3.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse3.overGoalStudents },
            ];
          }

          prepareDataReadingResult = [
            ...prepareDataReadingResult,
            { text: sec.goal },
            {
              text: `${sec.improvementPercentage !== undefined
                ? sec.improvementPercentage.toFixed(2)
                : 0
                }%`,
            },
          ];

          allDataReadingResult.push(prepareDataReadingResult);
        });
      }

      TableReadingDiagnosis.table.body = allDataReadingResult;

      // -- Table Math
      const FirstHeaderMultiplication: any = [
        {
          fillColor: "#00809a",
          color: "#FFF",
          bold: true,
          text: "Diagnóstico de multiplicación",
          alignment: "center",
          colSpan: 13,
        },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
      ];

      const SecondHeaderMultiplication: any = [
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "", colSpan: 2 },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 1", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 2", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 3", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "\nMeta", rowSpan: 2 },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "\nPorcentaje de mejora", rowSpan: 2 },
      ];

      const ThirdHeaderMultiplication: any = [
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Grado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Seccion" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "" },
      ];

      let prepareDataMultiplicationResult: any;
      const allDataMultiplicationResult: any = [];

      allDataMultiplicationResult.push(FirstHeaderMultiplication);
      allDataMultiplicationResult.push(SecondHeaderMultiplication);
      allDataMultiplicationResult.push(ThirdHeaderMultiplication);

      if (report.yearSummary.math) {
        report.yearSummary.math.sections.forEach((sec, key) => {
          prepareDataMultiplicationResult = [
            { text: sec.grade },
            { text: sec.name },
          ];

          if (sec.lapse1 !== undefined) {
            prepareDataMultiplicationResult = [
              ...prepareDataMultiplicationResult,
              {
                text:
                  sec.lapse1.resultAverage !== undefined
                    ? sec.lapse1.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse1.indexAverage !== undefined
                    ? sec.lapse1.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse1.overGoalStudents },
            ];
          }

          if (sec.lapse2 !== undefined) {
            prepareDataMultiplicationResult = [
              ...prepareDataMultiplicationResult,
              {
                text:
                  sec.lapse2.resultAverage !== undefined
                    ? sec.lapse2.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse2.indexAverage !== undefined
                    ? sec.lapse2.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse2.overGoalStudents },
            ];
          }

          if (sec.lapse3 !== undefined) {
            prepareDataMultiplicationResult = [
              ...prepareDataMultiplicationResult,
              {
                text:
                  sec.lapse3.resultAverage !== undefined
                    ? sec.lapse3.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse3.indexAverage !== undefined
                    ? sec.lapse3.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse3.overGoalStudents },
            ];
          }

          prepareDataMultiplicationResult = [
            ...prepareDataMultiplicationResult,
            { text: sec.goal },
            {
              text: `${sec.improvementPercentage !== undefined
                ? sec.improvementPercentage.toFixed(2)
                : 0
                }%`,
            },
          ];

          allDataMultiplicationResult.push(prepareDataMultiplicationResult);
        });
      }

      TableMultiplicationDiagnosis.table.body = allDataMultiplicationResult;

      // -- Table Logic Reasoning
      const FirstHeaderLogicReasoning: any = [
        {
          fillColor: "#00809a",
          color: "#FFF",
          bold: true,
          text: "Diagnóstico de razonamiento lógico - matemático",
          alignment: "center",
          colSpan: 13,
        },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
        { fillColor: "#00809a", text: "" },
      ];

      const SecondHeaderLogicReasoning: any = [
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "", colSpan: 2 },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 1", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 2", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Lapso 3", colSpan: 3, alignment: "center" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "\nMeta", rowSpan: 2 },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "\nPorcentaje de mejora", rowSpan: 2 },
      ];

      const ThirdHeaderLogicReasoning: any = [
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Grado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Seccion" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Resultado" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Índice" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "Encima de la meta" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "" },
        { fillColor: "#81b03e", color: "#FFF", bold: true, text: "" },
      ];

      let prepareDataLogicReasoningResult: any;
      const allDataLogicReasoningResult: any = [];

      allDataLogicReasoningResult.push(FirstHeaderLogicReasoning);
      allDataLogicReasoningResult.push(SecondHeaderLogicReasoning);
      allDataLogicReasoningResult.push(ThirdHeaderLogicReasoning);

      if (report.yearSummary.logic) {
        report.yearSummary.logic.sections.forEach((sec, key) => {
          prepareDataLogicReasoningResult = [
            { text: sec.grade },
            { text: sec.name },
          ];

          if (sec.lapse1 !== undefined) {
            prepareDataLogicReasoningResult = [
              ...prepareDataLogicReasoningResult,
              {
                text:
                  sec.lapse1.resultAverage !== undefined
                    ? sec.lapse1.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse1.indexAverage !== undefined
                    ? sec.lapse1.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse1.overGoalStudents },
            ];
          }

          if (sec.lapse2 !== undefined) {
            prepareDataLogicReasoningResult = [
              ...prepareDataLogicReasoningResult,
              {
                text:
                  sec.lapse2.resultAverage !== undefined
                    ? sec.lapse2.resultAverage.toFixed(2)
                    : "",
              },
              {
                text:
                  sec.lapse2.indexAverage !== undefined
                    ? sec.lapse2.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse2.overGoalStudents },
            ];
          }

          if (sec.lapse3 !== undefined) {
            prepareDataLogicReasoningResult = [
              ...prepareDataLogicReasoningResult,
              {
                text:
                  sec.lapse3.resultAverage !== undefined
                    ? sec.lapse3.resultAverage.toFixed(2)
                    : " ",
              },
              {
                text:
                  sec.lapse3.indexAverage !== undefined
                    ? sec.lapse3.indexAverage.toFixed(2)
                    : "",
              },
              { text: sec.lapse3.overGoalStudents },
            ];
          }

          prepareDataLogicReasoningResult = [
            ...prepareDataLogicReasoningResult,
            { text: sec.goal },
            {
              text: `${sec.improvementPercentage !== undefined
                ? sec.improvementPercentage.toFixed(2)
                : 0
                }%`,
            },
          ];

          allDataLogicReasoningResult.push(prepareDataLogicReasoningResult);
        });
      }

      TableLogicReasoningDiagnosis.table.body = allDataLogicReasoningResult;
    }

    const capitalizeString = (str: string) => {
      if (!str) return "";
      return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    // -- Variables style --

    const colorRowOne: any = {
      fillColor: "#00809a",
      color: "#FFF",
      bold: true,
    };
    const colorRowTwo: any = {
      fillColor: "#81b03e",
      color: "#FFF",
      bold: true,
    };


    // -- Helper to get student cells for a diagnostic and lapse
    const getDiagnosticCells = (
      studentData: any,
      currentLapseKey: 'lapse1' | 'lapse2' | 'lapse3',
      diagnosticType: 'reading' | 'math' | 'logic'
    ) => {
      const studentLapse = studentData[currentLapseKey];
      if (!studentLapse) {
        return [{ text: "" }, { text: "" }];
      }

      let resultVal: any = "";
      let indexVal: any = "";
      let rawIndex: number | null = null;
      let rawResult: number | null = null;

      if (diagnosticType === 'reading') {
        rawResult = studentLapse.wordsPerMin;
        rawIndex = studentLapse.wordsPerMinIndex;
      } else if (diagnosticType === 'math') {
        rawResult = studentLapse.multiplicationsPerMin;
        rawIndex = studentLapse.multiplicationsPerMinIndex;
      } else if (diagnosticType === 'logic') {
        rawResult = studentLapse.operationsPerMin;
        rawIndex = studentLapse.operationsPerMinIndex;
      }

      if (rawResult !== undefined && rawResult !== null) {
        resultVal = rawResult;
      }
      if (rawIndex !== undefined && rawIndex !== null) {
        indexVal = rawIndex.toFixed(2);
      }

      const cellResult: any = { text: resultVal, alignment: "center" };
      const cellIndex: any = { text: indexVal, alignment: "center" };

      if (rawIndex !== null) {
        if (rawIndex >= 100) {
          let greenColor = "#81b03e";
          let textColor = "#FFF";
          if (currentLapseKey === 'lapse1') {
            greenColor = "#c0d89f";
            textColor = "#000";
          } else if (currentLapseKey === 'lapse2') {
            greenColor = "#a1c46e";
            textColor = "#000";
          }
          cellResult.fillColor = greenColor;
          cellResult.color = textColor;
          cellIndex.fillColor = greenColor;
          cellIndex.color = textColor;
        }
      }

      return [cellResult, cellIndex];
    };

    // -- Helper to format last test date for header
    const getTestDate = (lapse: Lapse, diagnosticType: 'reading' | 'math' | 'logic') => {
      if (!lapse || !lapse.available || !lapse[diagnosticType]) return '';
      const d = lapse[diagnosticType].lastTestDate;
      return d ? formatDate(d, "dd/MM/yyyy", "es-VE") : '';
    };

    // -- Helper to get summary cells
    const getSummaryCell = (
      lapse: Lapse,
      diagnosticType: 'reading' | 'math' | 'logic',
      metricType: 'participants' | 'resultAverage' | 'overGoalAverage' | 'indexAverage'
    ) => {
      if (!lapse || !lapse.available || !lapse[diagnosticType]) {
        return { text: "", colSpan: 2, fillColor: "#F5F5F5" };
      }

      const stats = lapse[diagnosticType];
      let val: any = "";

      if (metricType === 'participants') {
        val = stats.participants !== undefined ? stats.participants : "";
      } else if (metricType === 'resultAverage') {
        val = stats.resultAverage !== undefined ? stats.resultAverage.toFixed(2) : "";
      } else if (metricType === 'overGoalAverage') {
        val = stats.overGoalAverage !== undefined ? `${stats.overGoalAverage.toFixed(2)}%` : "0.00%";
      } else if (metricType === 'indexAverage') {
        val = stats.indexAverage !== undefined ? stats.indexAverage.toFixed(2) : "";
      }

      return { text: val, alignment: "center", bold: true, colSpan: 2, fillColor: "#F5F5F5" };
    };

    // -- Build unified section tables
    const sectionTables: any[] = [];

    report.sections.forEach((section, secIndex) => {
      const isLapse1Available = section.lapse1 && section.lapse1.available;
      const isLapse2Available = section.lapse2 && section.lapse2.available;
      const isLapse3Available = section.lapse3 && section.lapse3.available;

      const hasReading = (isLapse1Available && section.lapse1.reading) || (isLapse2Available && section.lapse2.reading) || (isLapse3Available && section.lapse3.reading);
      const hasMath = (isLapse1Available && section.lapse1.math) || (isLapse2Available && section.lapse2.math) || (isLapse3Available && section.lapse3.math);
      const hasLogic = (isLapse1Available && section.lapse1.logic) || (isLapse2Available && section.lapse2.logic) || (isLapse3Available && section.lapse3.logic);

      const totalCols = 2 + (hasReading ? 6 : 0) + (hasMath ? 6 : 0) + (hasLogic ? 6 : 0);

      let resultWidth = 28;
      let indexWidth = 32;

      let activeDiagnosticsCount = 0;
      if (hasReading) activeDiagnosticsCount++;
      if (hasMath) activeDiagnosticsCount++;
      if (hasLogic) activeDiagnosticsCount++;

      if (activeDiagnosticsCount === 1) {
        resultWidth = 70;
        indexWidth = 75;
      } else if (activeDiagnosticsCount === 2) {
        resultWidth = 40;
        indexWidth = 45;
      }

      const widths: any[] = [14, "*"];
      if (hasReading) widths.push(resultWidth, indexWidth, resultWidth, indexWidth, resultWidth, indexWidth);
      if (hasMath) widths.push(resultWidth, indexWidth, resultWidth, indexWidth, resultWidth, indexWidth);
      if (hasLogic) widths.push(resultWidth, indexWidth, resultWidth, indexWidth, resultWidth, indexWidth);

      const body: any[] = [];

      // Row 1: Section Details (same header row)
      const sectionDetailRow = [
        {
          text: `Grado: ${section.grade || ''}          Sección: ${section.name || ''}          Docente: ${section.teacher || ''}          Matrícula de la sección: ${section.enrollment || 0}`,
          colSpan: totalCols,
          alignment: "left",
          bold: true,
          fillColor: "#EAEAEA",
          margin: [5, 4, 5, 4]
        },
        ...Array(totalCols - 1).fill({})
      ];
      body.push(sectionDetailRow);

      // Row 2: Diagnostics Categories
      const categoriesRow: any[] = [
        { text: "", ...colorRowTwo, alignment: "center" },
        { text: "", ...colorRowTwo, alignment: "center" }
      ];
      if (hasReading) {
        categoriesRow.push({ text: "LECTURA", colSpan: 6, ...colorRowOne, alignment: "center" }, {}, {}, {}, {}, {});
      }
      if (hasMath) {
        categoriesRow.push({ text: "MULTIPLICACIÓN", colSpan: 6, ...colorRowOne, alignment: "center" }, {}, {}, {}, {}, {});
      }
      if (hasLogic) {
        categoriesRow.push({ text: "LÓGICA", colSpan: 6, ...colorRowOne, alignment: "center" }, {}, {}, {}, {}, {});
      }
      body.push(categoriesRow);

      // Row 3: Lapses subheaders
      const lapsesRow: any[] = [
        { text: "", ...colorRowTwo, alignment: "center" },
        { text: "Nombre y Apellido", ...colorRowTwo, alignment: "center" }
      ];
      const addLapseSubheaders = () => {
        lapsesRow.push(
          { text: "1er", ...colorRowTwo, alignment: "center" },
          { text: "Índice", ...colorRowTwo, alignment: "center" },
          { text: "2do", ...colorRowTwo, alignment: "center" },
          { text: "Índice", ...colorRowTwo, alignment: "center" },
          { text: "3er", ...colorRowTwo, alignment: "center" },
          { text: "Índice", ...colorRowTwo, alignment: "center" }
        );
      };
      if (hasReading) addLapseSubheaders();
      if (hasMath) addLapseSubheaders();
      if (hasLogic) addLapseSubheaders();
      body.push(lapsesRow);

      // Row 4: Dates Row
      const datesRow: any[] = [
        { text: "Fecha del diagnóstico", colSpan: 2, bold: true, fillColor: "#F5F5F5" }, {}
      ];
      const addLapseDates = (diagnosticType: 'reading' | 'math' | 'logic') => {
        datesRow.push(
          { text: getTestDate(section.lapse1, diagnosticType), colSpan: 2, alignment: 'center', fillColor: '#F5F5F5' }, {},
          { text: getTestDate(section.lapse2, diagnosticType), colSpan: 2, alignment: 'center', fillColor: '#F5F5F5' }, {},
          { text: getTestDate(section.lapse3, diagnosticType), colSpan: 2, alignment: 'center', fillColor: '#F5F5F5' }, {}
        );
      };
      if (hasReading) addLapseDates('reading');
      if (hasMath) addLapseDates('math');
      if (hasLogic) addLapseDates('logic');
      body.push(datesRow);

      // Row 5: Goals Row
      const goalsRow: any[] = [
        { text: "Meta", colSpan: 2, bold: true, fillColor: "#F5F5F5" }, {}
      ];
      const addLapseGoals = (diagnosticType: 'reading' | 'math' | 'logic') => {
        const getGoalText = (lapse: Lapse) => {
          return lapse && lapse.available && lapse[diagnosticType] ? `Meta: ${lapse[diagnosticType].goal}` : '';
        };
        goalsRow.push(
          { text: getGoalText(section.lapse1), colSpan: 2, alignment: 'center', fillColor: '#F5F5F5', bold: true }, {},
          { text: getGoalText(section.lapse2), colSpan: 2, alignment: 'center', fillColor: '#F5F5F5', bold: true }, {},
          { text: getGoalText(section.lapse3), colSpan: 2, alignment: 'center', fillColor: '#F5F5F5', bold: true }, {}
        );
      };
      if (hasReading) addLapseGoals('reading');
      if (hasMath) addLapseGoals('math');
      if (hasLogic) addLapseGoals('logic');
      body.push(goalsRow);

      // Map unique students
      const studentsMap = new Map<string, {
        id?: string;
        firstName: string;
        lastName: string;
        cardType: string;
        cardId: string;
        lapse1?: Student;
        lapse2?: Student;
        lapse3?: Student;
      }>();

      const addStudentsToMap = (lapseStudents: Student[], lapseKey: 'lapse1' | 'lapse2' | 'lapse3') => {
        if (lapseStudents) {
          lapseStudents.forEach(student => {
            const key = student.id
              ? student.id
              : (student.cardId && student.cardType)
                ? `${student.cardType}-${student.cardId}`
                : `${student.firstName || ''}-${student.lastName || ''}`;
            if (!studentsMap.has(key)) {
              studentsMap.set(key, {
                id: student.id || '',
                firstName: student.firstName || '',
                lastName: student.lastName || '',
                cardType: student.cardType || '',
                cardId: student.cardId || '',
              });
            }
            studentsMap.get(key)[lapseKey] = student;
          });
        }
      };

      if (isLapse1Available) addStudentsToMap(section.lapse1.students, 'lapse1');
      if (isLapse2Available) addStudentsToMap(section.lapse2.students, 'lapse2');
      if (isLapse3Available) addStudentsToMap(section.lapse3.students, 'lapse3');

      // Sort students alphabetically
      const sortedStudents = Array.from(studentsMap.values()).sort((a, b) => {
        const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
        const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      // Populate student rows
      sortedStudents.forEach((student, key) => {
        const row: any[] = [
          { text: key + 1, alignment: "center" },
          { text: capitalizeString(`${student.firstName} ${student.lastName}`) }
        ];

        if (hasReading) {
          row.push(...getDiagnosticCells(student, 'lapse1', 'reading'));
          row.push(...getDiagnosticCells(student, 'lapse2', 'reading'));
          row.push(...getDiagnosticCells(student, 'lapse3', 'reading'));
        }
        if (hasMath) {
          row.push(...getDiagnosticCells(student, 'lapse1', 'math'));
          row.push(...getDiagnosticCells(student, 'lapse2', 'math'));
          row.push(...getDiagnosticCells(student, 'lapse3', 'math'));
        }
        if (hasLogic) {
          row.push(...getDiagnosticCells(student, 'lapse1', 'logic'));
          row.push(...getDiagnosticCells(student, 'lapse2', 'logic'));
          row.push(...getDiagnosticCells(student, 'lapse3', 'logic'));
        }

        body.push(row);
      });
      const summaryMetrics: ('participants' | 'resultAverage' | 'overGoalAverage' | 'indexAverage')[] = [
        'participants', 'resultAverage', 'overGoalAverage', 'indexAverage'
      ];
      const summaryLabels = {
        participants: "Estudiantes participantes",
        resultAverage: "Promedio del resultado",
        overGoalAverage: "Porcentaje sobre la meta",
        indexAverage: "Promedio del índice"
      };

      summaryMetrics.forEach(metric => {
        const row: any[] = [
          { text: summaryLabels[metric], colSpan: 2, bold: true, fillColor: "#F5F5F5" }, {}
        ];

        const addLapseSummary = (diagnosticType: 'reading' | 'math' | 'logic') => {
          row.push(
            getSummaryCell(section.lapse1, diagnosticType, metric), {},
            getSummaryCell(section.lapse2, diagnosticType, metric), {},
            getSummaryCell(section.lapse3, diagnosticType, metric), {}
          );
        };

        if (hasReading) addLapseSummary('reading');
        if (hasMath) addLapseSummary('math');
        if (hasLogic) addLapseSummary('logic');

        body.push(row);
      });

      if (secIndex > 0) {
        sectionTables.push({ text: '', pageBreak: 'before' });
      }

      sectionTables.push({
        table: {
          widths,
          body,
        },
        layout: this.borderCustomWithLessPadding,
        margin: [0, 0, 0, 30],
      });
    });

    finalReport.content.push(sectionTables);


    if (report.yearSummaryAvailable) {
      finalReport.content.push({ text: '', pageBreak: 'after' });
      finalReport.content.push([
        {
          alignment: "center",
          columns: [
            {
              width: "*",
              text: "Resultados generales",
              color: "#2e8aaa",
              alignment: "center",
              fontSize: 15,
              bold: true,
              margin: [30, 10, 30, 30],
            },
          ],
        },
      ]);

      // -- Three tables

      if (report.yearSummary.reading) {
        finalReport.content.push({
          columns: [
            { width: '*', text: '' },
            { width: 'auto', stack: [TableReadingDiagnosis] },
            { width: '*', text: '' }
          ]
        });
      }

      if (report.yearSummary.math) {
        finalReport.content.push({
          columns: [
            { width: '*', text: '' },
            { width: 'auto', stack: [TableMultiplicationDiagnosis] },
            { width: '*', text: '' }
          ]
        });
      }

      if (report.yearSummary.logic) {
        finalReport.content.push({
          columns: [
            { width: '*', text: '' },
            { width: 'auto', stack: [TableLogicReasoningDiagnosis] },
            { width: '*', text: '' }
          ]
        });
      }

      // -- Final result
      finalReport.content.push({
        table: {
          body: [
            [
              {
                ...colorRowOne,
                text: "Promedio total en el diagnóstico de lectura:",
              },
              {
                text:
                  report.yearSummary.reading &&
                    report.yearSummary.reading.totalResultAverage !== undefined
                    ? report.yearSummary.reading.totalResultAverage.toFixed(2)
                    : "",
              },
            ],
            [
              {
                ...colorRowTwo,
                text: "Promedio total en el diagnóstico de multiplicación:",
              },
              {
                text:
                  report.yearSummary.math &&
                    report.yearSummary.math.totalResultAverage !== undefined
                    ? report.yearSummary.math.totalResultAverage.toFixed(2)
                    : "",
              },
            ],
            [
              {
                text: "Promedio total en el diagnóstico de razonamiento lógico matemático:",
              },
              {
                text:
                  report.yearSummary.logic &&
                    report.yearSummary.logic.totalResultAverage !== undefined
                    ? report.yearSummary.logic.totalResultAverage.toFixed(2)
                    : "",
              },
            ],
            [
              { ...colorRowOne, text: "Porcentaje de mejora en lectura:" },

              {
                text: `${report.yearSummary.reading &&
                  report.yearSummary.reading.improvementPercentageAverage !==
                  undefined
                  ? report.yearSummary.reading.improvementPercentageAverage.toFixed(
                    2
                  )
                  : 0
                  }%`,
              },
            ],
            [
              {
                ...colorRowTwo,
                text: "Porcentaje de mejora en el diagnóstico en multiplicación:",
              },

              {
                text: `${report.yearSummary.math &&
                  report.yearSummary.math.improvementPercentageAverage !==
                  undefined
                  ? report.yearSummary.math.improvementPercentageAverage.toFixed(
                    2
                  )
                  : 0
                  }%`,
              },
            ],
            [
              {
                text: "Porcentaje de mejora en razonamiento lógico - matemático:",
              },
              {
                text: `${report.yearSummary.logic &&
                  report.yearSummary.logic.improvementPercentageAverage !==
                  undefined
                  ? report.yearSummary.logic.improvementPercentageAverage.toFixed(
                    2
                  )
                  : 0
                  }%`,
              },
            ],
          ],
          widths: "*",
        },

        layout: this.borderCustom,
        margin: [0, 0, 0, 30],
      });
    }

    const totalsResults: any = [
      [{ ...colorRowOne, text: "Estudiantes sobre la meta" }],
      [{ text: "Lapso 1:" }],
      [{ text: "Lapso 2" }],
      [{ text: "Lapso 3" }],
    ];
    if (report.totales.lapse1.reading) {
      totalsResults[0].push({
        ...colorRowOne,
        text: "Diagnóstico de lectura",
      });
      totalsResults[1].push({
        text: report.totales.lapse1.reading.studentsMeta,
      });

      totalsResults[2].push({
        text: report.totales.lapse2.reading.studentsMeta,
      });

      totalsResults[3].push({
        text: report.totales.lapse3.reading.studentsMeta,
      });
    }

    if (report.totales.lapse1.math) {
      totalsResults[0].push({
        ...colorRowOne,
        text: "Diagnóstico de matemática",
      });
      totalsResults[1].push({
        text: report.totales.lapse1.math.studentsMeta,
      });

      totalsResults[2].push({
        text: report.totales.lapse2.math.studentsMeta,
      });

      totalsResults[3].push({
        text: report.totales.lapse3.math.studentsMeta,
      });
    }

    if (report.totales.lapse1.logic) {
      totalsResults[0].push({
        ...colorRowOne,
        text: "Diagnóstico de logica matemática",
      });
      totalsResults[1].push({
        text: report.totales.lapse1.logic.studentsMeta,
      });

      totalsResults[2].push({
        text: report.totales.lapse2.logic.studentsMeta,
      });

      totalsResults[3].push({
        text: report.totales.lapse3.logic.studentsMeta,
      });
    }

    tableTotales.push({
      table: {
        widths: "*",
        body: totalsResults,
      },
      layout: this.borderCustom,
      margin: [0, 0, 0, 30],
    });

    finalReport.content.push(tableTotales);

    const envElements = this.buildEnvironmentalReportElements(report);
    if (envElements.length > 0) {
      if (sectionTables.length > 0) {
        envElements.push({ text: '', pageBreak: 'after' });
      }
      finalReport.content.unshift(...envElements);
    }

    finalReport.content.unshift(documentSubHeaderData);
    finalReport.content.unshift(titleDocument);

    // -- Generate document --
    const window = pdfMake.createPdf(finalReport);

    const schoolName = report.school ? `_${report.school.replace(/ /g, '_').replace(/\./g, '')}` : '';
    const schoolYear = report.schoolYear ? `_${report.schoolYear.replace(/\//g, '-')}` : '';
    const dateFormatted = formatDate(new Date(), 'dd-MM-yyyy-HH-mm', 'es-VE');
    const fileName = `Reporte-diagnosticos${schoolName}${schoolYear}_${dateFormatted}.pdf`;

    window.download(fileName);
  }

  buildEnvironmentalReportElements(report: DiagnosticReport): any[] {
    const elements: any[] = [];
    if (!report.environmental || !report.environmental.hasData) {
      return elements;
    }

    const colorRowOne: any = {
      fillColor: "#00809a",
      color: "#FFF",
      bold: true,
    };
    const colorRowTwo: any = {
      fillColor: "#81b03e",
      color: "#FFF",
      bold: true,
    };

    const formatVal = (val: any, isAverage = false): string => {
      if (val === null || val === undefined || val === '') return '-';
      const num = Number(val);
      if (isNaN(num)) return '-';
      if (isAverage) {
        return num.toFixed(2);
      }
      return Number.isInteger(num) ? num.toString() : num.toFixed(2);
    };

    // Header 1: Banner Title
    const headerRow1: any[] = [
      {
        text: "DIAGNÓSTICO AMBIENTAL — ÍNDICE AMBIENTAL AMBLEMA (IAA) — RESULTADOS POR LAPSO",
        colSpan: 21,
        ...colorRowOne,
        alignment: "center",
        fontSize: 7.5,
        margin: [0, 2, 0, 2],
      },
      ...Array(20).fill({})
    ];

    // Header 2: Grouped Indicators
    const headerRow2: any[] = [
      { text: "Lapso", rowSpan: 2, ...colorRowTwo, alignment: "center", fontSize: 6.8, margin: [0, 6, 0, 0] },
      { text: "1. Limpieza y cuidado", colSpan: 4, ...colorRowTwo, alignment: "center", fontSize: 6.8 }, {}, {}, {},
      { text: "2. Gestión residuos", colSpan: 4, ...colorRowTwo, alignment: "center", fontSize: 6.8 }, {}, {}, {},
      { text: "3. Biodiversidad", colSpan: 4, ...colorRowTwo, alignment: "center", fontSize: 6.8 }, {}, {}, {},
      { text: "4. Aprovechamiento agua", colSpan: 4, ...colorRowTwo, alignment: "center", fontSize: 6.8 }, {}, {}, {},
      { text: "5. Relación comunidad", colSpan: 3, ...colorRowTwo, alignment: "center", fontSize: 6.8 }, {}, {},
      { text: "Total IAA", rowSpan: 2, ...colorRowTwo, alignment: "center", fontSize: 6.8, margin: [0, 6, 0, 0] },
    ];

    // Header 3: Subcriteria & Averages
    const headerRow3: any[] = [
      {},
      { text: "1.1", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "1.2", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "1.3", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "Prom", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "2.1", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "2.2", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "2.3", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "Prom", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "3.1", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "3.2", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "3.3", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "Prom", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "4.1", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "4.2", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "4.3", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "Prom", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "5.1", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "5.2", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      { text: "Prom", ...colorRowTwo, alignment: "center", fontSize: 6.5 },
      {},
    ];

    const body: any[] = [headerRow1, headerRow2, headerRow3];

    const lapseLabels: { [key: string]: string } = {
      '1': '1er Lapso',
      '2': '2do Lapso',
      '3': '3er Lapso',
    };

    const activeSummaries: any[] = [];
    const maxLapse = (report as any).targetLapse || (report as any).lapso || 3;

    ['1', '2', '3']
      .filter(lKey => parseInt(lKey) <= Number(maxLapse))
      .forEach(lKey => {
      const lapseData = report.environmental.lapses ? report.environmental.lapses[lKey] : null;
      const summary = lapseData ? lapseData.summary : null;
      const lapseName = (lapseData && lapseData.lapseName) || lapseLabels[lKey] || `Lapso ${lKey}`;

      if (summary && summary.totalIndex !== null && summary.totalIndex !== undefined) {
        activeSummaries.push(summary);
        body.push([
          { text: lapseName, alignment: "center", bold: true, fontSize: 6.5, fillColor: "#F5F5F5" },
          // 1. Limpieza
          { text: formatVal(summary.cleanlinessAndCareOfSpaces ? summary.cleanlinessAndCareOfSpaces['1.1'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.cleanlinessAndCareOfSpaces ? summary.cleanlinessAndCareOfSpaces['1.2'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.cleanlinessAndCareOfSpaces ? summary.cleanlinessAndCareOfSpaces['1.3'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.cleanlinessAndCareOfSpaces ? summary.cleanlinessAndCareOfSpaces.average : null, true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#D5E8EB" },
          // 2. Residuos
          { text: formatVal(summary.wasteManagement ? summary.wasteManagement['2.1'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.wasteManagement ? summary.wasteManagement['2.2'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.wasteManagement ? summary.wasteManagement['2.3'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.wasteManagement ? summary.wasteManagement.average : null, true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#D5E8EB" },
          // 3. Biodiversidad
          { text: formatVal(summary.biodiversityConservation ? summary.biodiversityConservation['3.1'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.biodiversityConservation ? summary.biodiversityConservation['3.2'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.biodiversityConservation ? summary.biodiversityConservation['3.3'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.biodiversityConservation ? summary.biodiversityConservation.average : null, true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#D5E8EB" },
          // 4. Agua
          { text: formatVal(summary.waterUse ? summary.waterUse['4.1'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.waterUse ? summary.waterUse['4.2'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.waterUse ? summary.waterUse['4.3'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.waterUse ? summary.waterUse.average : null, true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#D5E8EB" },
          // 5. Comunidad
          { text: formatVal(summary.communityRelations ? summary.communityRelations['5.1'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.communityRelations ? summary.communityRelations['5.2'] : null, true), alignment: "center", fontSize: 6.5 },
          { text: formatVal(summary.communityRelations ? summary.communityRelations.average : null, true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#D5E8EB" },
          // Total IAA
          { text: formatVal(summary.totalIndex, true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#C2DFE3" },
        ]);
      }
    });

    if (activeSummaries.length === 0) {
      return elements;
    }

    // Promedio General row (if 2 or more lapses have data)
    if (activeSummaries.length > 1) {
      const calcAvg = (getter: (s: any) => number | null) => {
        const vals = activeSummaries
          .map(getter)
          .filter(v => v !== null && v !== undefined && !isNaN(Number(v)))
          .map(v => Number(v));
        if (!vals.length) return null;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
      };

      body.push([
        { text: "Promedio General", alignment: "center", bold: true, fontSize: 6.0, fillColor: "#EAEAEA" },
        // 1. Limpieza
        { text: formatVal(calcAvg(s => s.cleanlinessAndCareOfSpaces ? s.cleanlinessAndCareOfSpaces['1.1'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.cleanlinessAndCareOfSpaces ? s.cleanlinessAndCareOfSpaces['1.2'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.cleanlinessAndCareOfSpaces ? s.cleanlinessAndCareOfSpaces['1.3'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.cleanlinessAndCareOfSpaces ? s.cleanlinessAndCareOfSpaces.average : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#BCE1E6" },
        // 2. Residuos
        { text: formatVal(calcAvg(s => s.wasteManagement ? s.wasteManagement['2.1'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.wasteManagement ? s.wasteManagement['2.2'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.wasteManagement ? s.wasteManagement['2.3'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.wasteManagement ? s.wasteManagement.average : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#BCE1E6" },
        // 3. Biodiversidad
        { text: formatVal(calcAvg(s => s.biodiversityConservation ? s.biodiversityConservation['3.1'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.biodiversityConservation ? s.biodiversityConservation['3.2'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.biodiversityConservation ? s.biodiversityConservation['3.3'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.biodiversityConservation ? s.biodiversityConservation.average : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#BCE1E6" },
        // 4. Agua
        { text: formatVal(calcAvg(s => s.waterUse ? s.waterUse['4.1'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.waterUse ? s.waterUse['4.2'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.waterUse ? s.waterUse['4.3'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.waterUse ? s.waterUse.average : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#BCE1E6" },
        // 5. Comunidad
        { text: formatVal(calcAvg(s => s.communityRelations ? s.communityRelations['5.1'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.communityRelations ? s.communityRelations['5.2'] : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#EAEAEA" },
        { text: formatVal(calcAvg(s => s.communityRelations ? s.communityRelations.average : null), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#BCE1E6" },
        // Total IAA
        { text: formatVal(calcAvg(s => s.totalIndex), true), alignment: "center", bold: true, fontSize: 6.5, fillColor: "#A4D4DC" },
      ]);
    }

    const widths: any[] = [
      64,
      28, 28, 28, 31,
      28, 28, 28, 31,
      28, 28, 28, 31,
      28, 28, 28, 31,
      28, 28, 31,
      44
    ];

    const TableEnvironmentalDiagnosis: any = {
      table: {
        widths,
        body,
      },
      layout: this.borderCustomWithLessPadding,
      margin: [0, 0, 0, 8],
    };

    const environmentalLegendBox: any = {
      margin: [0, 0, 0, 10],
      table: {
        widths: ["33%", "33%", "34%"],
        body: [
          [
            {
              fillColor: "#00809a",
              color: "#FFF",
              bold: true,
              fontSize: 7.2,
              text: "LEYENDA DE CRITERIOS AMBIENTALES (PREGUNTAS)",
              colSpan: 3,
              alignment: "center",
              margin: [0, 2, 0, 2]
            },
            {},
            {}
          ],
          [
            {
              fillColor: "#FAFAFA",
              fontSize: 5.8,
              margin: [3, 3, 3, 3],
              stack: [
                { text: "1. Limpieza y cuidado de los espacios", bold: true, color: "#00809a", fontSize: 6.4, margin: [0, 0, 0, 1] },
                { text: "1.1: ¿Hay ausencia de papeles o basura en zonas de aulas, patios y áreas comunes?", margin: [0, 0, 0, 1] },
                { text: "1.2: ¿La escuela dispone de papeleras suficientes en las diferentes áreas?", margin: [0, 0, 0, 1] },
                { text: "1.3: ¿Los estudiantes, docentes y personal hacen uso correcto de las papeleras?", margin: [0, 0, 0, 3] },
                { text: "2. Gestión y aprovechamiento de los residuos", bold: true, color: "#00809a", fontSize: 6.4, margin: [0, 1, 0, 1] },
                { text: "2.1: ¿Se clasifica la basura en residuos orgánicos e inorgánicos?", margin: [0, 0, 0, 1] },
                { text: "2.2: ¿Tienen lugares apropiados e identificados para el resguardo de residuos?", margin: [0, 0, 0, 1] },
                { text: "2.3: ¿Poseen un plan o proyecto activo para aprovechamiento/reciclaje?", margin: [0, 0, 0, 1] },
              ]
            },
            {
              fillColor: "#FAFAFA",
              fontSize: 5.8,
              margin: [3, 3, 3, 3],
              stack: [
                { text: "3. Conservación de la biodiversidad", bold: true, color: "#00809a", fontSize: 6.4, margin: [0, 0, 0, 1] },
                { text: "3.1: ¿La escuela tiene jardines planificados y bien mantenidos?", margin: [0, 0, 0, 1] },
                { text: "3.2: ¿Tienen un huerto escolar desarrollado y cuidado por la comunidad?", margin: [0, 0, 0, 1] },
                { text: "3.3: ¿Existe algún proyecto activo para conocer la biodiversidad vegetal?", margin: [0, 0, 0, 3] },
                { text: "4. Aprovechamiento del agua", bold: true, color: "#00809a", fontSize: 6.4, margin: [0, 1, 0, 1] },
                { text: "4.1: ¿Se evidencia conciencia sobre el buen uso del agua, evitando malgasto?", margin: [0, 0, 0, 1] },
                { text: "4.2: ¿Poseen recipientes/tanques aptos para almacenamiento y riego?", margin: [0, 0, 0, 1] },
                { text: "4.3: ¿Poseen estructura o plan para recolección de agua de lluvia?", margin: [0, 0, 0, 1] },
              ]
            },
            {
              fillColor: "#FAFAFA",
              fontSize: 5.8,
              margin: [3, 3, 3, 3],
              stack: [
                { text: "5. Relación con la comunidad", bold: true, color: "#00809a", fontSize: 6.4, margin: [0, 0, 0, 1] },
                { text: "5.1: ¿La escuela realiza acciones directas que aportan a la limpieza comunitaria?", margin: [0, 0, 0, 1] },
                { text: "5.2: ¿Padres y vecinos participan en proyectos ambientales escolares?", margin: [0, 0, 0, 4] },
                { text: "Escala de Interpretación IAA (0 - 35 pts)", bold: true, color: "#81b03e", fontSize: 6.4, margin: [0, 0, 0, 1] },
                { text: "• Excelente: 31 – 35 pts (Prácticas ambientales consolidadas)", margin: [0, 0, 0, 1] },
                { text: "• Satisfactorio: 21 – 30 pts (Buen desempeño con oportunidades de mejora)", margin: [0, 0, 0, 1] },
                { text: "• En Desarrollo: 11 – 20 pts (Iniciativas en fase inicial o parcial)", margin: [0, 0, 0, 1] },
                { text: "• Inicial: 00 – 10 pts (Requiere plan de acción urgente)", margin: [0, 0, 0, 1] }
              ]
            }
          ]
        ]
      },
      layout: this.borderCustomWithLessPadding
    };

    elements.push(TableEnvironmentalDiagnosis);
    elements.push(environmentalLegendBox);

    return elements;
  }

  async onGenerateSummaryDiagnostic(report: DiagnosticReport) { }

  async generatePinsReport(report: any) {
    const finalReport: any = {
      info: {
        title: "Reporte de pines",
        author: "Fundación AmbLeMa",
        subject: "Reporte de pines",
        keywords: "Reporte, pines, lectura, lógica, matemática",
      },
      pageSize: "A4",
      pageOrientation: "portrait",
      content: [],
      defaultStyle: {
        fontSize: 10,
      },
    };

    const titleDocument: any = [
      {
        image: IMAGE,
        width: 100,
        absolutePosition: { x: 30, y: 15 },
      },
      {
        alignment: "center",
        columns: [
          {
            width: "*",
            text: "Reporte de pines",
            color: "#2e8aaa",
            alignment: "center",
            fontSize: 18,
            bold: true,
            margin: [0, 15, 0, 15],
          },
        ],
      },
    ];

    const documentSubHeaderData: any = {
      table: {
        body: [
          [
            { text: "Período académico:", bold: true },
            { text: report.schoolYear },
            { text: "Fecha:", bold: true },
            { text: formatDate(report.date, "dd/MM/yyyy", "es-VE") },
          ],
        ],
      },
      layout: this.borderCustom,
      margin: [0, 25, 0, 20],
    };

    const tableHeadersRow1: any[] = [
      { text: "\nEscuela\n", fillColor: "#81b03e", color: "#FFF", bold: true, alignment: "center", rowSpan: 2 },
      { text: "\nEstado\n", fillColor: "#81b03e", color: "#FFF", bold: true, alignment: "center", rowSpan: 2 },
      { text: "\nMatrícula\n", fillColor: "#81b03e", color: "#FFF", bold: true, alignment: "center", rowSpan: 2 },
      { text: "Estudiantes sobre la meta", fillColor: "#00809a", color: "#FFF", bold: true, alignment: "center", colSpan: 3 },
      {},
      {}
    ];

    const tableHeadersRow2: any[] = [
      {},
      {},
      {},
      { text: "PPM", fillColor: "#00809a", color: "#FFF", bold: true, alignment: "center" },
      { text: "M2M", fillColor: "#00809a", color: "#FFF", bold: true, alignment: "center" },
      { text: "L60M", fillColor: "#00809a", color: "#FFF", bold: true, alignment: "center" }
    ];

    const tableBody: any[][] = [tableHeadersRow1, tableHeadersRow2];

    let totalEnrollment = 0;
    let totalReading = 0;
    let totalMath = 0;
    let totalLogic = 0;

    let currentState = "";
    let stateEnrollment = 0;
    let stateReading = 0;
    let stateMath = 0;
    let stateLogic = 0;

    const appendStateTotalRow = (stateName: string) => {
      tableBody.push([
        { text: `Total ${stateName}`, bold: true, fillColor: "#F9F9F9", alignment: "left", colSpan: 2 },
        {},
        { text: stateEnrollment.toString(), bold: true, fillColor: "#F9F9F9", alignment: "center" },
        { text: stateReading.toString(), bold: true, fillColor: "#F9F9F9", alignment: "center" },
        { text: stateMath.toString(), bold: true, fillColor: "#F9F9F9", alignment: "center" },
        { text: stateLogic.toString(), bold: true, fillColor: "#F9F9F9", alignment: "center" }
      ]);
    };

    report.schools.forEach((school: any, index: number) => {
      const schoolState = school.state || "Sin Estado";

      if (currentState !== "" && currentState !== schoolState) {
        appendStateTotalRow(currentState);
        stateEnrollment = 0;
        stateReading = 0;
        stateMath = 0;
        stateLogic = 0;
      }

      currentState = schoolState;

      stateEnrollment += school.enrollment || 0;
      stateReading += school.readingOverGoal || 0;
      stateMath += school.mathOverGoal || 0;
      stateLogic += school.logicOverGoal || 0;

      totalEnrollment += school.enrollment || 0;
      totalReading += school.readingOverGoal || 0;
      totalMath += school.mathOverGoal || 0;
      totalLogic += school.logicOverGoal || 0;

      tableBody.push([
        { text: school.schoolName, alignment: "left" },
        { text: school.state || "", alignment: "center" },
        { text: (school.enrollment || 0).toString(), alignment: "center" },
        { text: (school.readingOverGoal || 0).toString(), alignment: "center" },
        { text: (school.mathOverGoal || 0).toString(), alignment: "center" },
        { text: (school.logicOverGoal || 0).toString(), alignment: "center" }
      ]);

      if (index === report.schools.length - 1) {
        appendStateTotalRow(currentState);
      }
    });

    // Add totals row
    tableBody.push([
      { text: "Total general", bold: true, fillColor: "#F5F5F5", alignment: "left", colSpan: 2 },
      {},
      { text: totalEnrollment.toString(), bold: true, fillColor: "#F5F5F5", alignment: "center" },
      { text: totalReading.toString(), bold: true, fillColor: "#F5F5F5", alignment: "center" },
      { text: totalMath.toString(), bold: true, fillColor: "#F5F5F5", alignment: "center" },
      { text: totalLogic.toString(), bold: true, fillColor: "#F5F5F5", alignment: "center" }
    ]);

    const tableContent = {
      table: {
        widths: ["*", 70, 50, 40, 40, 40],
        body: tableBody,
      },
      layout: this.borderCustom,
      margin: [0, 0, 0, 30]
    };

    finalReport.content.push(titleDocument);
    finalReport.content.push(documentSubHeaderData);
    finalReport.content.push(tableContent);

    const pdf = pdfMake.createPdf(finalReport);

    const parts = report.schoolYear.split("-");
    const finalYear = parts[parts.length - 1].trim();
    const pad = (n) => n < 10 ? '0' + n : n;
    const now = new Date();
    const dateFormatted = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const fileName = `Reporte-pines-${finalYear}_${dateFormatted}.pdf`;

    pdf.download(fileName);
  }
}

