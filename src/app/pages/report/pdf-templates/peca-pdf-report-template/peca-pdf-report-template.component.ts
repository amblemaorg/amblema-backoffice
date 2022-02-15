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

  getStyleCell(location = "", data) {
    const primary =
      "color: white; background-color: #2e8aaa; font-weight: bold;"; // Blue
    const secondary =
      "color: white; background-color: #81b03e; font-weight: bold;"; // Green dark
    const warning =
      "color: #747474; background-color: #ffff00; font-weight: bold;"; // Yellow
    const success =
      "color: white; background-color: #95cf43; font-weight: bold;"; // Green light
    const danger =
      "color: white; background-color: #ff7878; font-weight: bold;"; // Red
    const textCenter = "text-align: center; margin: auto;";

    switch (location) {
      case "":
        return primary;

      case "columnBody":
        const { idxCell, row, cell } = data;
        const firstRow = row[0].text.toLowerCase();
        const regExp = "(W|^)lapso[ ][0-9](W|$)"; // 'lapso<espacio><cualquier numero>';

        if (firstRow.match(regExp)) {
          return secondary;
        }

        if (idxCell === 0) {
          return primary;
        }

        if (cell.text.includes("%")) {
          const cellTextRange = parseFloat(cell.text);

          if (cellTextRange === 0) {
            return danger + textCenter;
          }

          // 1% - 99%
          if (cellTextRange > 0 && cellTextRange < 100) {
            return warning + textCenter;
          }
          // 100%
          if (cellTextRange === 100) {
            return success + textCenter;
          }
        }

        return "";
      default:
        return primary;
    }
  }
}
