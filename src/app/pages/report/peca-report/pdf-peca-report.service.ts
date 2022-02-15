import { ElementRef, Inject, Injectable } from "@angular/core";
import { DOCUMENT, DatePipe } from "@angular/common";
import { IMAGE } from "../img-base-64";
// import { OlympicsReport } from "src/app/_models/report/math-olympics-report.model";
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
const htmlToPdfmake = require("html-to-pdfmake");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PDFReportPeca {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private datePipe: DatePipe
  ) {}

  async generatePdfFromHtml(pdfElement) {
    try {
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
          // Metadata, visible en la propiedades del documento
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

      /**
       * Insert the records bo
       */
      const records: any = [];

      // PDF To Html
      const html = htmlToPdfmake(pdfElement.nativeElement.outerHTML);

      records.push(html);

      finalDocument.content.push(records);

      pdfMake.createPdf(finalDocument).open();
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  getBodyToPdfMake(mockData: any) {
    const firstMapHeaderCells = {
      [`Escuela `]: "E.",
      [`Primaria `]: "P.",
      [`Integral `]: "I.",
      [`Bolivariana `]: "B.",
      [`Educativa `]: "E.",
      [`Educativo `]: "E.",
      [`Estadal `]: "E.",
      [`Básica `]: "B.",
      [`Basica `]: "B.",
      [`Nacional `]: "N.",
      [`Colegio `]: "C.",
      [`Educación `]: "E.",
      [`Educacion `]: "E.",
      [`Centro `]: "C.",
      [`Unidad `]: "U.",
    };

    const secondMapHeaderCells = {
      [`E.B.N.B.`]: "E.B.N.B. ",
      [`U.E.E.`]: "U.E.E. ",
      [`U.E.`]: "U.E. ",
      [`U.E `]: "U.E. ",
      [`U.E.N.`]: "U.E.N. ",
      [`E.P.B.`]: "E.P.B. ",
      [`E.I.B.`]: "E.I.B. ",
    };

    /**
     * Reemplazan los textos iniciales por prefijos.
     * Se agregan espacio vació de separación a los prefijos.
     * Se modifica el color de texto y peso a los textos de la primera fila y columna a blanco y bold
     * El resto de columnas y filas a negro.
     */
    let body = mockData.map((rows, rowIndex) => {
      // Las columnas contienen las filas
      const cols = rows.map((cell, columnIndex) => {
        let text;

        if (cell.length) {
          // Reemplazando por prefijos y agregando espacios en blanco

          // Obtenemos con expresión regular las coincidencias
          const firstRegEx = new RegExp(
            Object.keys(firstMapHeaderCells).join("|"),
            "gi"
          );

          // Reemplazamos en este caso las palabras por prefijos
          // Por ejemplo, "Escuela " a "E."
          text = cell.replace(firstRegEx, (matched) => {
            return firstMapHeaderCells[matched];
          });

          // Obtenemos con expresión regular las coincidencias
          const secondRegEx = new RegExp(
            Object.keys(secondMapHeaderCells).join("|"),
            "gi"
          );

          // Reemplazamos y agregamos el mismo texto pero con un espacio vació al final
          // Por ejemplo, "E.B.N.B. " a "E.B.N.B. "
          text = text.replace(secondRegEx, (matched) => {
            if (!secondMapHeaderCells[matched]) {
              return matched;
            }
            return secondMapHeaderCells[matched];
          });
        } else {
          text = cell;
        }

        if (rowIndex === 0 || columnIndex === 0) {
          // Modificamos el color de texto de la primeras filas y columna
          return {
            text: text,
            color: "#fff",
            bold: true,
          };
        }

        return {
          text: text,
          color: "#000",
        };
      });

      return cols;
    });

    return body;
  }
}
