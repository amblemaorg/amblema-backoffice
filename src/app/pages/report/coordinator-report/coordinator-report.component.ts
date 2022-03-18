import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { UserReportService } from "src/app/services/report/user-report.service";
import { Subscription } from "rxjs";
import {
  ReadlyStatusConvert,
  FilterStatus,
  FilterAmblemPensum,
} from "src/app/_helpers/utility";
import { PDFReport } from "../pdf-report.service";
import { DatePipe } from "@angular/common";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

@Component({
  selector: "app-coordinator-report",
  templateUrl: "./coordinator-report.component.html",
  styleUrls: ["./coordinator-report.component.scss"],
  providers: [PDFReport, DatePipe],
})
export class CoordinatorReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;

  settings: any = {
    noDataMessage: "No hay registros",
    actions: {
      add: false,
      delete: false,
      edit: false,
    },

    columns: {
      firstName: {
        title: "Nombre",
        type: "string",
      },
      lastName: {
        title: "Apellido",
        type: "string",
      },
      email: {
        title: "Correo",
        type: "string",
      },
      cardId: {
        // Identidad
        title: "Identidad",
        type: "string",
      },

      phone: {
        title: "Teléfono Móvil",
        type: "number",
      },
      homePhone: {
        title: "Teléfono de habitación",
        type: "number",
      },
      addressState: {
        title: "Estado",
        type: "string",
      },
      addressMunicipality: {
        title: "Municipio",
        type: "string",
      },
      address: {
        // Calles / carreras
        title: "Calles / carreras",
        type: "string",
      },
      addressHome: {
        title: "Casa / Edificio",
        type: "string",
      },
      instructed: {
        title: "AmbLePensum",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return row ? "Completado" : "No completado";
        },
        filterFunction: FilterAmblemPensum,
      },
      profession: {
        title: "Profesión",
        type: "string",
      },
      schools: {
        title: "Escuelas",
        type: "string",
      },
      status: {
        title: "Estatus",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return ReadlyStatusConvert([{ status: row }])[0].status;
        },
        filterFunction: FilterStatus,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  status = [
    { label: "Activo", value: "1" },
    { label: "Inactivo", value: "2" },
  ];

  statusSelected = "1";

  selectedAmbLePensum = null;

  disabledBtn = false;

  constructor(
    private cd: ChangeDetectorRef,
    private toast: CustomToastrService,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport("1", "1")
      .subscribe((usersActive) => {
        this.data = usersActive.users;
        this.subscriptionService = this.userReporteService
          .getUserReport("1", "2")
          .subscribe((response) => {
            if (response.users.length) {
              response.users.forEach((element) => {
                this.data = [...this.data, element];
              });
            }
            this.source.load(this.data);
          });
      });
  }

  async ngOnDestroy() {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onGenerateReportExcel(): void {
    this.disabledBtn = true;
    const workbookBin = this.makeExcel();
    const octetStream = this.binary2octet(workbookBin);
    saveAs(
      new Blob([octetStream], { type: "application/octet-stream" }),
      `Reporte de coordinadores.xls`
    );

    setTimeout(() => {
      this.disabledBtn = false;
      this.cd.detectChanges();
    }, 3500);
  }

  makeExcel(): void {
    const mappedKeys = {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo",
      cardId: "Identidad", // Identidad
      phone: "Teléfono móvil",
      homePhone: "Teléfono de habitación",
      addressState: "Estado",
      addressMunicipality: "Municipio",
      address: "Calles / carreras", // address
      addressHome: "Casa / Edificio",
      instructed: "AmblePensum",
      profession: "Profesión",
      schools: "Escuelas",
      status: "Estatus",
    };
    const keysOfInterest = [
      "firstName",
      "lastName",
      "email",
      "cardId",
      "phone",
      "homePhone",
      "addressState",
      "addressMunicipality",
      "address",
      "addressHome",
      "instructed",
      "profession",
      "schools",
      "status",
    ];
    const data: any[] = this.data.map((record) => {
      const mappedData = Object.entries(record)
        .filter((entry) => {
          if (keysOfInterest.includes(entry[0])) {
            return entry;
          }
        })
        .map(([key, value]) => {
          let cellValue;
          if (key === "schools") {
            cellValue = value.toString();
          } else {
            cellValue = value;
          }
          if (key === "status") {
            cellValue = this.status.find(
              (element) => element.value === cellValue
            ).label;
          } else if (key === "instructed") {
            cellValue = cellValue ? "Completado" : "No completado";
          }
          return [`${mappedKeys[key]}`, cellValue];
        });
      const obj = mappedData.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        <any>{}
      );
      return obj;
    });
    const reportTitle = [["Reporte de coordinadores"]];
    const columnHeaders: string[] = Object.values(mappedKeys);
    // const matrixz = data.filter((rows, idx) => idx !== 0);

    const values = this.sortedValues(columnHeaders, data);

    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: `Reporte de coordinadores`,
      Subject: "Data",
      Author: "Amblema",
      CreatedDate: new Date(Date.now()),
    };

    workbook.SheetNames.push("Reporte de coordinadores");
    const matrix = [reportTitle, columnHeaders, ...values];
    const columns = XLSX.utils.aoa_to_sheet(matrix);
    workbook.Sheets["Reporte de coordinadores"] = columns;

    /* Exportar workbook como binario para descarga */
    const workbookBinary = XLSX.write(workbook, {
      type: "binary",
      bookType: "xls",
    });
    return workbookBinary;
  }

  private sortedValues(columnHeaders: string[], matrixz: any[]) {
    const matrixzSorted = [];

    matrixz.forEach((matrixzMap) => {
      const valuesSorted = {};

      columnHeaders.forEach((columnHeader) => {
        valuesSorted[columnHeader] = matrixzMap[columnHeader];
      });

      matrixzSorted.push(valuesSorted);
    });

    return matrixzSorted.map((record) => {
      return Object.values(record);
    });
  }

  private binary2octet(binary): ArrayBuffer {
    const buffer = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      view[i] = binary.charCodeAt(i) & 0xff; // transformacion a octeto
    }
    return buffer;
  }

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.userReporteService
      .getUserReport("1", this.statusSelected, this.selectedAmbLePensum)
      .subscribe(
        (response) => {
          if (response.users.length) {
            this.generatorReport.generateUserReport(response);
          } else {
            this.toast.info(
              "Información",
              "No hay registro en el estatus o configuración seleccionada"
            );
          }

          setTimeout(() => {
            this.disabledBtn = false;
            this.cd.detectChanges();
          }, 3500);
        },
        () => (this.disabledBtn = false)
      );
  }
}
