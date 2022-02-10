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

  /**
   * La matriz pasada por parametros representa las columnas con
   * sus respectivas filas
   * @param mockData Matrix (Arrays into Arrays of data)
   */
  async generateActivities(mockData: any) {
    try {
      // No encuentro efecto
      const colorHeaderRow: any = {
        fillColor: "#81b03e",
        color: "#FFF",
        bold: true,
      };
      // No encuentro efecto
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

      const firstMapHeaderCells = {
        [`Escuela `]: "E.",
        [`Primaria `]: "P.",
        [`Integral `]: "I.",
        [`Bolivariana `]: "B.",
        [`Educativa `]: "E.",
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
        [`U.E.N.`]: "U.E.N. ",
        [`E.P.B.`]: "E.P.B. ",
        [`E.I.B.`]: "E.I.B. ",
      };

      const lapses = ["Lapso 1", "Lapso 2", "Lapso 3"];

      /**
       * Reemplazan los textos iniciales por prefijos.
       * Se agregan espacio vació de separación a los prefijos.
       * Se modifica el color de texto y peso a los textos de la primera fila y columna a blanco y bold
       * El resto de columnas y filas a negro.
       */
      const body = mockData.map((rows, rowIndex) => {
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

      const bodyResp = this.documentResponsive(body);

      const content = [
        {
          style: "table",
          table: {
            dontBreakRows: true,
            body,
            // body: bodyResp,
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
                return "#81b03e";
              }
              // Row & column headers
              if (rowIndex === 0 || columnIndex === 0) {
                if (lapses.includes(cellData)) {
                  console.log("trueee: ", cellData);
                  return "#81b03e";
                }
                return "#2e8aaa";
              }
              // Text info: Aprobado, Pendiente, Rechazado, Cancelado
              if (!cellData.includes("%")) {
                return colorMap[cellData];
              }
              // Parse Numeric info: 0%, 50%, 65%, 100%...
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

      // Agregar aquí función que modifique el documento a crear
      // Para agregar espacios vacíos

      pdfMake.createPdf(finalDocument).open();
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  documentResponsive(body) {
    // let colsResp = [];

    // body.forEach((rows, rowIndex) => {
    //   let rowsResp = [];
    //   const eachColumnAdd = 12;

    //   // Agregar una fila extra con celdas vacias
    //   // para crear un espacio cada 12 filas
    //   if (rowIndex > 0 && rowIndex % eachColumnAdd === 0) {
    //     const countCells = rows.length;
    //     const spaceCell = {
    //       text: `Row: ${rowIndex}`,
    //       color: "#000",
    //       fillColor: "#fff",
    //     };

    //     // rowsResp.push(Array(countCells).fill(spaceCell));
    //     colsResp.push(Array(countCells).fill(spaceCell));
    //   }

    //   // Nunca se deja de guardar las filas originales correspondientes
    //   // rowsResp.push(rows);

    //   // Se guarda el nuevo grupo de filas con las filas de espaciado adicionales
    //   // El grupo de filas conforman una columna
    //   colsResp.push(rows);
    // });

    // console.log("");
    // console.log("documentResponsive");

    // console.log("colsResp: ", colsResp);
    // console.log("");

    // return colsResp;

    const table = new Table(body);

    table.addRows([
      {
        text: `Cell: 1`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 2`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 3`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 4`,
        color: "#000",
        fillColor: "#fff",
      },
    ]);

    return table.getMatrix();
  }
}

interface Cell {
  text: string;
  color: string;
  fillColor: string;
}

class Table {
  constructor(public body = []) {}

  addRows(newRows: Cell[], addSpace = { each: 12, add: false }) {
    if (addSpace.add) {
      this.globalAddWhiteSpaceRow(addSpace.each);
    }

    // Completamos con celdas las vacias necesarias para que el pdfMaker no genere error
    // Al detectar que la cantidad de celdas entre esta fila y otras es menor
    const rowsLength = this.body[0].length;

    if (newRows.length !== rowsLength) {
      const countCellsToFill = rowsLength - newRows.length;
      const cellFillers = Array(countCellsToFill).fill({
        text: `vació`,
        color: "#000",
        fillColor: "#fff",
      });

      newRows.push(...cellFillers);
    }

    this.body.push(newRows);

    return this.body;
  }

  AddWhiteSpaceRow(rows, rowIndex, eachColumnAdd) {
    if (!(rowIndex > 0 && rowIndex % eachColumnAdd === 0)) {
      return false;
    }

    const countCells = rows.length;
    const spaceCell = {
      text: `Row: ${rowIndex}`,
      color: "#000",
      fillColor: "#fff",
    };

    return Array(countCells).fill(spaceCell);
  }

  // Agrega la fila vaciá pero realiza un foreach que en casos es innecesario
  globalAddWhiteSpaceRow(eachColumnAdd = 12) {
    let bodyResp = []; // columnas (colsResp) -  el body es un array de columnas

    this.body.forEach((rows, rowIndex) => {
      const whiteSpaceRow = this.AddWhiteSpaceRow(
        rows,
        rowIndex,
        eachColumnAdd
      );
      if (whiteSpaceRow) {
        bodyResp.push(whiteSpaceRow);
      }

      // Se guarda el nuevo grupo de filas con las filas de espaciado adicionales
      // El grupo de filas conforman una columna
      bodyResp.push(rows);
    });

    this.body = bodyResp;

    return bodyResp;
  }

  getMatrix() {
    console.log("getMatrix: ", this.body);
    return this.body;
  }
}
