import { Inject, Injectable } from "@angular/core";
import { DOCUMENT, DatePipe } from "@angular/common";
import { IMAGE } from "../img-base-64";
// import { OlympicsReport } from "src/app/_models/report/math-olympics-report.model";
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
    try {
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
          width: 50,
          absolutePosition: { x: 30, y: 10 },
        },
        {
          alignment: "center",
          columns: [
            {
              width: "*",
              text: "Reporte de actividades del PECA",
              color: "#2e8aaa",
              alignment: "center",
              fontSize: 12,
              bold: true,
              margin: [0, 0, 10, 20],
            },
          ],
        },
      ];
      const finalDocument: any = {
        info: {
          title: "Reporte de actividades del PECA",
          author: "Binaural C.A",
          subject: "Reporte de actividades del PECA",
          keywords: "Reporte, usuarios, coordinador, escuela",
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

      const estados = ["Aprobado", "Pendiente", "Cancelado", "Rechazado"];
      const colorMap = {
        Aprobado: "#68BB59",
        Pendiente: "yellow",
        Cancelado: "red",
        Rechazado: "red",
      };

      const body = mockData.map((rows, rowIndex) => {
        const cols = rows.map((cell, columnIndex) => {
          if (rowIndex === 0 || columnIndex === 0)
            return {
              text: cell,
              color: "#fff",
              bold: true,
            };
          else
            return {
              text: cell,
              color: "#000",
            };
        });
        return cols;
      });
      const content = [
        {
          style: "table",
          table: {
            pageBreak: "before",
            dontBreakRows: true,
            body,
          },
          layout: {
            color: function (rowIndex, node, columnIndex) {
              if (columnIndex === 0 && rowIndex === 0) {
                return "#fff";
              }
            },
            fillColor: function (rowIndex, node, columnIndex) {
              // return rowIndex % 2 === 0 ? "#CCCCCC" : null;
              const cellData = node.table.body[rowIndex][columnIndex].text;

              // Lapse row
              if (!cellData.length) {
                return "#fff";
              }
              // Row & column headers
              if (rowIndex === 0 || columnIndex === 0) {
                return "#2e8aaa";
              }
              // Text info: Aprobado, Pendiente, Rechazado, Cancelado
              if (!cellData.includes("%")) {
                return colorMap[cellData];
              }
              // Parse Numeric info: 0%, 50%, 65%, 100%...
              console.log("cell data: ", cellData);
              const data = parseFloat(cellData);

              // 0%
              if (data === 0) {
                return "red";
              }
              // 1% - 99%
              if (data > 0 && data < 100) {
                return "yellow";
              }
              // 100%
              if (data === 100) {
                return "#68BB59";
              }
            },
          },
        },
      ];
      records.push(content);

      finalDocument.content.push(records);

      pdfMake.createPdf(finalDocument).open();
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
}
