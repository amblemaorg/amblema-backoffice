import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-peca-pdf-report-template",
  templateUrl: "./peca-pdf-report-template.component.html",
  styleUrls: ["./peca-pdf-report-template.component.scss"],
})
export class PecaPdfReportTemplateComponent implements OnInit {
  @Input() settings;
  @Input() source;
  @Input() bodyTable = [];

  table = {
    thForPage: 9,
    th: [
      // 5 pages (11 cells)
      [
        {
          // Cell
          text: "actividad - page 1",
        },
        {
          text: "Escuela Primaria Bolivariana - page 1",
        },
        {
          text: "Escuela secundaria 2 - page 1",
        },
      ],
      [
        {
          text: "actividad - page 2",
        },
        {
          text: "Escuela Primaria Bolivariana - page 2",
        },
        {
          text: "Escuela secundaria 2 - page 2",
        },
      ],
    ],
    tbody: [
      // Nombres de Actividades y los resultados
      [
        // rows Page 1

        [
          // row 1

          {
            // Cell
            text: "Lapso 1 - row 1 - page 1",
          },
          {
            text: "Vacio 2 - row 1 - page 1",
          },
          {
            text: "Vacio 3 - row 1 - page 1",
          },
        ],
        [
          // row 2

          {
            text: "Lapso 1 - row 2 - page 1",
          },
          {
            text: "Vacio 2 - row 2 - page 1",
          },
          {
            text: "Vacio 3 - row 2 - page 1",
          },
        ],
      ],
      [
        // rows Page 2

        [
          // row 1
          {
            text: "AmbLEncuentro 1 - row 1 - page 2",
          },
          {
            text: "0% 2 - row 1 - page 2",
          },
          {
            text: "0% 3 - row 1 - page 2",
          },
        ],
        [
          // row 2
          {
            text: "AmbLEncuentro 1 - row 2 - page 2",
          },
          {
            text: "0% 2 - row 2 - page 2",
          },
          {
            text: "0% 3 - row 2 - page 2",
          },
        ],
      ],
    ],
  };

  constructor() {}

  ngOnInit(): void {
    console.log("bodyTable Init: ", this.bodyTable);
    this.paginateThead();
    this.paginateTbody();
  }

  paginateThead(thForPage = this.table.thForPage) {
    const firstRow = this.bodyTable[0];
    const firstTh = firstRow[0];
    const countThead = firstRow.length / thForPage; // 50 / 10 = 5 paginas (Tablas)

    let beggingIdx = 0;
    let lastIndxToGet = thForPage;

    let tableThead = []; // [[a,b,c,d] [a,e,f,g]]

    firstRow.shift(); // Elimina el primer elemento

    for (let index = 0; index < countThead; index++) {
      let partRow = [];

      partRow.push(firstTh);

      const nextPartRow = firstRow.slice(beggingIdx, lastIndxToGet); // 0 al 10 / second cycle: 10 - 20

      partRow.push(...nextPartRow);

      beggingIdx += partRow.length - 1; // 9
      lastIndxToGet = beggingIdx + thForPage; //  9 + 10 = 19 (Remember that array begin from 0)

      tableThead.push(partRow);
    }

    if (
      tableThead[tableThead.length - 1].length === 1 &&
      tableThead[tableThead.length - 1][0].text === firstTh.text
    ) {
      tableThead.pop();
    }

    console.log("paginateThead: ", tableThead);

    this.table.th = tableThead;
  }

  paginateRow(row, thForPage = this.table.thForPage) {
    const firstRow = row;
    const firstTh = firstRow[0];
    const countThead = firstRow.length / thForPage; // 50 / 10 = 5 paginas (Tablas)

    let beggingIdx = 0;
    let lastIndxToGet = thForPage;

    let rowPaginated = []; // [[a,b,c,d] [a,e,f,g]]

    firstRow.shift(); // Elimina el primer elemento

    for (let index = 0; index < countThead; index++) {
      let partRow = [];

      partRow.push(firstTh);

      const nextPartRow = firstRow.slice(beggingIdx, lastIndxToGet); // 0 al 10 / second cycle: 10 - 20

      partRow.push(...nextPartRow);

      beggingIdx += partRow.length - 1; // 9
      lastIndxToGet = beggingIdx + thForPage; //  9 + 10 = 19 (Remember that array begin from 0)

      rowPaginated.push(partRow);
    }

    if (
      rowPaginated[rowPaginated.length - 1].length === 1 &&
      rowPaginated[rowPaginated.length - 1][0].text === firstTh.text
    ) {
      rowPaginated.pop();
    }

    // console.log("paginateThead: ", rowPaginated);

    return rowPaginated;
  }

  paginateTbody() {
    // let tbody = [];
    const bodyTable = this.bodyTable;

    bodyTable.shift();

    // const tbodyHeads = bodyTable.map((body) => {
    //   return body[0];
    // });

    // const tbodyPaginated = this.paginateRow(bodyTable);
    // console.log("tbodyPaginated: ", tbodyPaginated);

    let tbodyPaginated = [];

    // this.paginateRow(bodyTable)

    bodyTable.forEach((bodyTableRow) => {
      tbodyPaginated.push(this.paginateRow(bodyTableRow));
    });

    console.log("tbodyPaginated: ", tbodyPaginated);

    let tbodyPaginatedFormatted = [];
    const tableThead = this.table.th;

    for (let index = 0; index < tableThead.length; index++) {
      const groupRows = [];

      tbodyPaginated.forEach((tbodyPage, idxTbodyPage) => {
        groupRows.push(tbodyPage[index]);
      });

      tbodyPaginatedFormatted.push(groupRows);
    }

    console.log("tbodyPaginatedFormatted: ", tbodyPaginatedFormatted);

    this.table.tbody = tbodyPaginatedFormatted;
  }

  // let tbody = [];
  // const bodyTable = this.bodyTable;
  // const countPage = this.table.th.length;

  // const testRow = Array(11).fill({
  //   text: "0% 3 - row 2 - page 2",
  // });

  // const toAdd = [
  //   Array(10).fill({
  //     text: "0% 3 - row 2 - page 2",
  //   }), //row
  //   Array(10).fill({
  //     text: "0% 3 - row 2 - page 2",
  //   }), //row
  // ];

  // const toAdd = this.getRowFormat(this.table.th[0], testRow);

  // tbody.push(toAdd);
  // tbody.push(toAdd);
  // tbody.push(toAdd);
  // tbody.push(toAdd);
  // tbody.push(toAdd);
  // tbody.push(toAdd);

  /**
   * @description The PDF Maker package do an error when some rows doesn't have
   * the same length cells as the first row (Array[0][0].length). So this method is
   * to equalize between new row's cells length and the original the first row (Array[0][0].length) cells length.
   * @author Christopher Dallar Document This
   * @date 10/02/2022
   * @private
   * @memberof Table
   * @returns newRows Cells formatted
   */
  private getRowFormat(
    firstThRow: any[],
    newRows: any[],
    cellFiller?: any
  ): any[] {
    const firstThRowLength = firstThRow.length;
    const newRowsLength = newRows.length;

    // If newRowsLength is fewer than original rowsLength, return cells that fill the rest of rows.length
    if (newRowsLength < firstThRowLength) {
      cellFiller = !cellFiller
        ? {
            text: "",
            color: "#fff",
            fillColor: "#fff",
          }
        : cellFiller;

      const countCellsToFill = firstThRowLength - newRows.length;
      // const cellFillers = Array(countCellsToFill).fill(cellFiller);
      let cellFillers = [];

      for (let index = 0; index < countCellsToFill; index++) {
        cellFillers.push(cellFiller);
      }

      newRows.push(...cellFillers);
    }

    // if new rows length is longer to original rows length, delete from newRows array since last position + 1 until the last position of newRows
    if (newRowsLength > firstThRowLength) {
      newRows.splice(firstThRowLength, newRowsLength - 1);
    }

    return newRows;
  }
}
