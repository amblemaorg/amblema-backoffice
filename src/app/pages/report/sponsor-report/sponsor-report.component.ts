import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { UserReportService } from "src/app/services/report/user-report.service";
import { Subscription } from "rxjs";
import { ReadlyStatusConvert, FilterStatus } from "src/app/_helpers/utility";
import { PDFReport } from "../pdf-report.service";
import { DatePipe } from "@angular/common";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

@Component({
  selector: "app-sponsor-report",
  templateUrl: "./sponsor-report.component.html",
  styleUrls: ["./sponsor-report.component.scss"],
  providers: [PDFReport, DatePipe],
})
export class SponsorReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;

  settings: any = {
    noDataMessage: "No hay registros",
    actions: {
      add: false,
      delete: false,
      edit: false,
    },

    columns: {
      name: {
        title: "Nombre de la empresa",
        type: "string",
      },
      companyRif: {
        title: "RIF",
        type: "number",
      },
      email: {
        title: "Correo",
        type: "string",
      },
      companyPhone: {
        title: "Teléfono",
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
      addressCity: {
        title: "Ciudad",
        type: "string",
      },
      schools: {
        title: "Escuela(s) que apadrina",
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

  disabledBtn = false;

  constructor(
    private toast: CustomToastrService,
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) {}

  ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport("0", "1")
      .subscribe((usersActive) => {
        this.data = usersActive.users;
        this.subscriptionService = this.userReporteService
          .getUserReport("0", "2")
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
      `Reporte de padrinos.xls`
    );

    setTimeout(() => {
      this.disabledBtn = false;
      this.cd.detectChanges();
    }, 3500);
  }

  makeExcel(): void {
    const mappedKeys = {
      name: "Nombre de la empresa",
      companyRif: "RIF",
      email: "Correo",
      companyPhone: "Teléfono",
      addressState: "Estado",
      addressMunicipality: "Municipio",
      addressCity: "Ciudad",
      schools: "Escuela(s) que apadrinan",
      status: "Estatus",
    };
    const keysOfInterest = [
      "name",
      "companyRif",
      "email",
      "companyPhone",
      "addressState",
      "addressMunicipality",
      "addressCity",
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
          } else cellValue = value;
          if (key === "status") {
            cellValue = this.status.find(
              (element) => element.value === cellValue
            ).label;
          }
          return [`${mappedKeys[key]}`, cellValue];
        });
      const obj = mappedData.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        <any>{}
      );
      return obj;
    });

    console.log("Data: ", data);
    console.log("data[0]: ", data[0]);
    // console.log("Object.keys(data[0]): ", Object.keys(data[0]));
    // console.log("getOwnPropertyNames(): ", Object.getOwnPropertyNames(data[0]));

    const reportTitle = [["Reporte de Padrinos"]];
    // let  columnHeaders = Object.keys(data[0]);
    let columnHeaders = [
      "Nombre de la empresa",
      "RIF",
      "Correo",
      "Teléfono",
      "Estado",
      "Municipio",
      "Ciudad",
      "Escuela(s) que apadrinan",
      "Estatus",
    ];

    let matrixz = data.filter((rows, idx) => idx !== 0);
    console.log("matrix1: ", matrixz);
    matrixz = matrixz.map((matrixzMap) => {
      return {
        "Nombre de la empresa": matrixzMap["Nombre de la empresa"],
        RIF: matrixzMap["RIF"],
        Correo: matrixzMap["Correo"],
        Teléfono: matrixzMap["Teléfono"],
        Estado: matrixzMap["Estado"],
        Municipio: matrixzMap["Municipio"],
        Ciudad: matrixzMap["Ciudad"],
        "Escuela(s) que apadrinan": matrixzMap["Escuela(s) que apadrinan"],
        Estatus: matrixzMap["Estatus"],
      };
    });

    const values = matrixz.map((record) => {
      return Object.values(record);
    });
    // console.log("columnHeaders: ", columnHeaders);
    // console.log("matrixz 2: ", matrixz);
    // console.log("values: ", values);
    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: `"Reporte de Padrinos"`,
      Subject: "Data",
      Author: "Amblema",
      CreatedDate: new Date(Date.now()),
    };

    workbook.SheetNames.push("Reporte de Padrinos");
    const matrix = [reportTitle, columnHeaders, ...values];
    const columns = XLSX.utils.aoa_to_sheet(matrix);
    workbook.Sheets["Reporte de Padrinos"] = columns;

    /* Exportar workbook como binario para descarga */
    const workbookBinary = XLSX.write(workbook, {
      type: "binary",
      bookType: "xls",
    });
    return workbookBinary;
  }

  private binary2octet(binary): ArrayBuffer {
    const buffer = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      view[i] = binary.charCodeAt(i) & 0xff; // transformacion a octeto
    }
    return buffer;
  }

  onGenerateReport(): void {
    this.disabledBtn = true;

    this.userReporteService.getUserReport("0", this.statusSelected).subscribe(
      (response) => {
        if (response.users.length) {
          this.generatorReport.generateUserReport(response);
        } else {
          this.toast.info(
            "Información",
            "No hay registro en el estatus seleccionado"
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
