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
    const countThead = firstRow.length / thForPage - 1; // 51 / 10 = 5 paginas - 5 arrays

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

    console.log("paginateThead: ", tableThead);

    this.table.th = tableThead;
  }

  paginateTbody(thForPage = this.table.thForPage) {
    let tbody = [];
    const countPage = this.table.th.length;

    const toAdd = [
      Array(10).fill({
        text: "0% 3 - row 2 - page 2",
      }),
      Array(10).fill({
        text: "0% 3 - row 2 - page 2",
      }),
    ];

    tbody.push(toAdd);
    tbody.push(toAdd);
    tbody.push(toAdd);
    tbody.push(toAdd);
    tbody.push(toAdd);

    console.log("paginateTbody: ", tbody);

    this.table.tbody = tbody;
  }
}
