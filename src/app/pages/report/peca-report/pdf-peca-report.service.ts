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

  /**
   * La matriz pasada por parametros representa las columnas con
   * sus respectivas filas
   * @param mockData Matrix (Arrays into Arrays of data)
   */
  async generateActivities(mockData: any, pdfElement?: ElementRef) {
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
      };

      /**
       * Insert the records bo
       */
      const records: any = [];

      const colorMap = {
        Aprobado: "#68BB59",
        Pendiente: "yellow",
        Cancelado: "red",
        Rechazado: "red",
      };

      const lapses = ["Lapso 1", "Lapso 2", "Lapso 3"];

      /**
       * Reemplazan los textos iniciales por prefijos.
       * Se agregan espacio vació de separación a los prefijos.
       * Se modifica el color de texto y peso a los textos de la primera fila y columna a blanco y bold
       * El resto de columnas y filas a negro.
       */
      const body = this.getBodyToPdfMake(mockData);

      const content = [
        {
          style: "table",
          table: {
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
      };

      /**
       * Insert the records bo
       */
      const records: any = [];

      // PDF To Html
      const html = htmlToPdfmake(pdfElement.nativeElement.outerHTML);
      console.log("html", html);

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

    // body = this.documentResponsive(body);

    return body;
  }

  documentResponsive(body) {
    const table = new Table(body);

    table.addRow([
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
      {
        text: `Cell: 5`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 6`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 7`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 8`,
        color: "#000",
        fillColor: "#fff",
      },
    ]);

    table.addRow([
      {
        text: `Cell: 9`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 10`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 11`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 12`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 5`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 6`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 7`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 8`,
        color: "#000",
        fillColor: "#fff",
      },
    ]);

    table.addRow([
      {
        text: `Cell: 17`,
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
      {
        text: `Cell: 5`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 6`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 7`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 80`,
        color: "#000",
        fillColor: "#fff",
      },
    ]);

    table.addRow([
      {
        text: `Cell: 18`,
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
      {
        text: `Cell: 5`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 6`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 7`,
        color: "#000",
        fillColor: "#fff",
      },
      {
        text: `Cell: 80`,
        color: "#000",
        fillColor: "#fff",
      },
    ]);

    const spaceCell = {
      text: "spaceCell",
      color: "#fff",
      fillColor: "#5eba7d",
    };

    table.addRowEach(
      12,
      table.getRowFormat(
        [
          {
            text: "No spaceCell",
            color: "#fff",
            fillColor: "#000",
          },
        ],
        spaceCell
      )
    );

    return table.getMatrix();
  }
}

interface Cell {
  text: string;
  color: string;
  fillColor?: string;
  fontSize?: number;
  bold?: boolean;
}

class Table {
  constructor(public body = []) {}

  /**
   * @description The PDF Maker package do an error when some rows doesn't have
   * the same length cells as the first row (Array[0][0].length). So this method is
   * to equalize between new row's cells length and the original the first row (Array[0][0].length) cells length.
   * @author Christopher Dallar Document This
   * @date 10/02/2022
   * @private
   * @memberof Table
   * @returns Array of Cells formatted
   */
  getRowFormat(newRow: Cell[], cellFiller?: Cell): Cell[] {
    const rowsLength = this.body[0].length;
    const newRowsLength = newRow.length;

    // If newRowsLength is fewer than original rowsLength, return cells that fill the rest of rows.length
    if (newRowsLength < rowsLength) {
      cellFiller = !cellFiller
        ? {
            text: "",
            color: "#fff",
            fillColor: "#fff",
          }
        : cellFiller;

      const countCellsToFill = rowsLength - newRow.length;
      // const cellFillers = Array(countCellsToFill).fill(cellFiller);
      let cellFillers = [];

      for (let index = 0; index < countCellsToFill; index++) {
        cellFillers.push(cellFiller);
      }

      newRow.push(...cellFillers);
    }

    // if new rows length is longer to original rows length, delete from newRows array since last position + 1 until the last position of newRows
    if (newRowsLength > rowsLength) {
      newRow.splice(rowsLength, newRowsLength - 1);
    }

    return newRow;
  }

  /**
   * @description Return an array with cell objects.
   * @Memo When pass more than one array of cell object  with the same text
   * only will printed the text of first cell and the other without it.
   * @author Christopher Dallar Document This
   * @date 10/02/2022
   * @param {Cell[]} newRow
   * @param {boolean} [addSpace={ each: 12, add: false }]
   * @return [ Object:Cell ]
   * @memberof Table
   */
  addRow(newRow: Cell[], cellFiller?: Cell): any[] {
    // Completamos con celdas las vaciás necesarias para que el pdfMaker no genere error
    // Al detectar que la cantidad de celdas entre esta fila y otras es menor o mayor
    newRow = this.getRowFormat(newRow, cellFiller);

    this.body.push(newRow);

    return this.body;
  }

  // addWhiteSpaceRow(rows, rowIndex, eachColumnAdd): Cell[] {
  //   if (!(rowIndex > 0 && rowIndex % eachColumnAdd === 0)) {
  //     return [];
  //   }

  //   const countCells = rows.length;
  //   const spaceCell = {
  //     text: `Space row: ${rowIndex}`,
  //     color: "#000",
  //     fillColor: "#fff",
  //   };

  //   return Array(countCells).fill(spaceCell);
  // }

  // getWhiteSpaceRow(): Cell[] {

  //   const spaceCell = {
  //     text: '',
  //     color: "#000",
  //     fillColor: "#fff",
  //   };

  //   // How cells array is empty the method will return rowFormat with spaceCell repeated
  //   return this.getRowFormat([], spaceCell);
  // }

  addRowEach(eachColumnAdd, newRow: Cell[]) {
    let bodyFormatted = [];

    this.body.forEach((row, rowIndex) => {
      if (rowIndex > 0 && rowIndex % eachColumnAdd === 0) {
        bodyFormatted.push(newRow);
      }

      bodyFormatted.push(row);
    });

    this.body = bodyFormatted;
  }

  // // Agrega la fila vaciá pero realiza un foreach que en casos es innecesario
  // globalAddWhiteSpaceRow(eachColumnAdd = 12) {
  //   let bodyResp = []; // columnas (colsResp) -  el body es un array de columnas

  //   this.body.forEach((rows, rowIndex) => {
  //     const whiteSpaceRow = this.addWhiteSpaceRow(
  //       rows,
  //       rowIndex,
  //       eachColumnAdd
  //     );
  //     if (whiteSpaceRow.length > 0) {
  //       bodyResp.push(whiteSpaceRow);
  //     }

  //     // Se guarda el nuevo grupo de filas con las filas de espaciado adicionales
  //     // El grupo de filas conforman una columna
  //     bodyResp.push(rows);
  //   });

  //   this.body = bodyResp;

  //   return bodyResp;
  // }

  getMatrix() {
    console.log("getMatrix: ", this.body);
    return this.body;
  }
}
