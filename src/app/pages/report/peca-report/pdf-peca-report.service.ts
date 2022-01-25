import { Inject, Injectable } from "@angular/core";
import { DOCUMENT, DatePipe } from "@angular/common";
import { IMAGE } from "../img-base-64";
import { OlympicsReport } from "src/app/_models/report/math-olympics-report.model";
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PDFReportPeca {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private datePipe: DatePipe
  ) {}

  async generateActivities(mockData: any) {
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
            text: "Reporte de las olimpíadas de matemáticas",
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
        title: "Reporte de olimpíadas de matemáticas",
        author: "Binaural C.A",
        subject: "Reporte de olimpíadas de matemáticas",
        keywords:
          "Reporte, usuarios, padrino, coordinador, docente, escuela, estudiante",
      },
      pageSize: "A4",
      content: [documentHeader],
      defaultStyle: {
        fontSize: 12,
      },
    };
  }
}
