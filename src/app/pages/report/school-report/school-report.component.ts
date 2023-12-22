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
  selector: "app-school-report",
  templateUrl: "./school-report.component.html",
  styleUrls: ["./school-report.component.scss"],
  providers: [PDFReport, DatePipe],
})
export class SchoolReportComponent implements OnInit, OnDestroy {
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
        title: "Nombre",
        type: "string",
      },
      code: {
        title: "Código",
        type: "number",
      },
      email: {
        title: "Correo",
        type: "number",
      },
      phone: {
        title: "Teléfono",
        type: "string",
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
        // City
        title: "Ciudad",
        type: "string",
      },
      address: {
        // Calles / carreras
        title: "Calles / carreras",
        type: "string",
      },
      addressZoneType: {
        title: "Zona",
        type: "string",
      },
      addressZone: {
        title: "Dirección de la zona",
        type: "string",
      },
      nGrades: {
        title: "N° de grados",
        type: "string",
      },
      nSections: {
        title: "N° de secciones",
        type: "string",
      },
      nAdministrativeStaff: {
        title: "Personal Admin.",
        type: "string",  
      },
      nLaborStaff: {
        title: "Personal Obrero",
        type: "string",  
      },
      nTeachers:{
        title: "Personal docente",
        type: "string",  
      },
      nStudents:{
        title: "Matrícula",
        type: "string",  
      },
      sponsor: {
        title: "Padrino",
        type: "string",
      },
      coordinator: {
        title: "Coordinador",
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
    private cd: ChangeDetectorRef,
    private toast: CustomToastrService,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport("2", "1")
      .subscribe((usersActive) => {
        this.data = usersActive.users;

        this.subscriptionService = this.userReporteService
          .getUserReport("2", "2")
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
      `Reporte de escuelas.xls`
    );

    setTimeout(() => {
      this.disabledBtn = false;
      this.cd.detectChanges();
    }, 3500);
  }

  makeExcel(): void {
    const mappedKeys = {
      name: "Nombre",
      code: "Código",
      email: "Correo",
      phone: "Teléfono",
      addressState: "Estado",
      addressMunicipality: "Municipio",
      addressCity: "Ciudad", // City
      address: "Calles / carreras", // Calles / carreras
      addressZoneType: "Zona",
      addressZone: "Dirección de la zona",
      nGrades: "N° de grados",
      nSections: "N° de secciones",
      nAdministrativeStaff: "Personal Admin.",
      nLaborStaff: "Personal Obrero",
      nTeachers: "Personal docente",
      nStudents: "Matrícula",
      sponsor: "Padrino",
      coordinator: "Coordinador",
      status: "Estatus",
    };
    const keysOfInterest = [
      "name",
      "code",
      "email",
      "phone",
      "addressState",
      "addressMunicipality",
      "addressCity",
      "address",
      "addressZoneType",
      "addressZone",
      "nGrades",
      "nAdministrativeStaff",
      "nLaborStaff",
      "nTeachers",
      "nStudents",
      "nSections",
      "sponsor",
      "coordinator",
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
          }
          return [`${mappedKeys[key]}`, cellValue];
        });
      const obj = mappedData.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        <any>{}
      );
      return obj;
    });
    const reportTitle = [["Reporte de escuelas"]];
    const columnHeaders: string[] = Object.values(mappedKeys);

    const status = {
      "1": "Activo",
      "2": "Inactivo",
    };

    const matrixz = data.filter(
      (rows) => rows["Estatus"] === status[this.statusSelected.toString()]
    );

    const values = this.sortedValues(columnHeaders, matrixz);

    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: `Reporte de escuelas`,
      Subject: "Data",
      Author: "AmbLeMa",
      CreatedDate: new Date(Date.now()),
    };

    workbook.SheetNames.push("Reporte de escuelas");
    const matrix = [reportTitle, columnHeaders, ...values];
    const columns = XLSX.utils.aoa_to_sheet(matrix);
    workbook.Sheets["Reporte de escuelas"] = columns;

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

  onGenerateReport(): void {
    this.disabledBtn = true;

    this.userReporteService
      .getUserReport("2", this.statusSelected)
      .subscribe((response) => {
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
      });
  }
}
