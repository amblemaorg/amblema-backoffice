import { FilterPipeSearch } from "./../../../_helpers/utility";
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PDFReport } from "../pdf-report.service";
import { UserReportService } from "src/app/services/report/user-report.service";
import { WorkPositionService } from "src/app/services/work-position.service";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from "@angular/common";
import {
  ReadlyStatusConvert,
  FilterStatus,
  ReadlyGender,
  FilterGender,
} from "src/app/_helpers/utility";
import { TeacherService } from "src/app/services/user/teacher.service";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { DomSanitizer } from "@angular/platform-browser";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

@Component({
  selector: "app-teacher-report",
  templateUrl: "./teacher-report.component.html",
  styleUrls: ["./teacher-report.component.scss"],
  providers: [PDFReport, DatePipe],
})
export class TeacherReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;
  subscriptionWorkPosition: Subscription;
  workPositionList = new Array<any>();
  
  isNotInscription = false;
  settings: any = {
    rowClassFunction: (row) => {
      if (row.data.annualPreparationStatus === null && row.isInEditing) {
        row.isInEditing = false;
        this.cd.detectChanges();
      }
    },
    noDataMessage: "No hay registros",
    actions: {
      columnTitle: "Acciones",
      add: false,
      delete: false,
      edit: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    columns: {
      firstName: {
        title: "Nombre",
        type: "string",
        editable: false,
      },
      lastName: {
        title: "Apellido",
        type: "string",
        editable: false,
      },
      cardId: {
        title: "Identidad",
        type: "number",
        editable: false,
      },
      gender: {
        title: "Genero",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return ReadlyGender(row);
        },
        filterFunction: FilterGender,
        editable: false,
        editor: {
          type: "list",
          config: {
            list: [
              { value: "1", title: "Femenino" },
              { value: "2", title: "Masculino" },
            ],
          },
        },
      },
      email: {
        title: "Correo",
        type: "string",
        editable: false,
      },
      phone: {
        title: "Teléfono Móvil",
        type: "number",
        editable: false,
      },
      schoolName:{
        title: "Escuela",
        type: "string",
        editable: false,
      },
      addressState: {
        title: "Estado",
        type: "string",
        editable: false,
      },
      addressMunicipality: {
        title: "Municipio",
        type: "string",
        editable: false,
      },
      addressCity: {
        title: "Ciudad",
        type: "string",
        editable: false,
      },
      address: {
        title: "Calles / carreras",
        type: "string",
        editable: false,
      },
      annualPreparationStatus: {
        title: "Inscripción de la convención",
        type: "html",
        valuePrepareFunction: (row: any) => {
          return this.sanatizer.bypassSecurityTrustHtml(
            `<div><span>${
              row === "1"
                ? "Preinscrito"
                : row === "2"
                ? "Inscrito"
                : "No esta inscrito"
            }</span></div>`
          );
        },
        filterFunction: (cell?: any, search?: string): boolean => {
          let value: string =
            cell === "1"
              ? "Preinscrito"
              : cell === "2"
              ? "Inscrito"
              : "No esta inscrito";

          value = value.toUpperCase();

          if (value.includes(search.toUpperCase()) || search === "") {
            return true;
          } else {
            return false;
          }
        },
        editor: {
          type: "list",
          config: {
            list: [
              { value: "1", title: "Preinscripto" },
              { value: "2", title: "Inscrito" },
            ],
          },
        },
      },
      specialty: {
        title: "Grado instrucción",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: FilterPipeSearch,
      },
      workPosition: {
        title: "Cargo",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: FilterPipeSearch,
      },
      
      status: {
        title: "Estatus",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return ReadlyStatusConvert([{ status: row }])[0].status;
        },
        filterFunction: FilterStatus,
        editable: false,
        editor: {
          type: "list",
          config: {
            list: [
              { value: "1", title: "Activo" },
              { value: "2", title: "Inactivo" },
            ],
          },
        },
      },
    },
  };

  status = [
    { label: "Activo", value: "1" },
    { label: "Inactivo", value: "2" },
  ];

  disabledBtn = false;

  statusSelected = "1";

  workPositionSelected = "";
  // -- 1 = preinscrito, 2 = inscrito --
  selectedAnnualConvention = null;

  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  constructor(
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private toast: CustomToastrService,
    private userReporteService: UserReportService,
    private userTeacherService: TeacherService,
    private workPositionService: WorkPositionService,
    private toastrService: CustomToastrService,
    private sanatizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport("3", "1")
      .subscribe((usersActive) => {
        this.data = usersActive.users;
        this.subscriptionService = this.userReporteService
          .getUserReport("3", "2")
          .subscribe((response) => {
            if (response.users.length) {
              response.users.forEach((element) => {
                this.data = [...this.data, element];
              });
              // console.log("getUserReport this.data", this.data);
            }

            this.source.load(this.data);
          });
      });
      this.getworkPositions();
  }

  async ngOnDestroy() {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
    if(this.subscriptionWorkPosition){
      this.subscriptionWorkPosition.unsubscribe();
    }
  }

  getworkPositions() {
    this.subscriptionWorkPosition = this.workPositionService
      .getWorkPosition()
      .subscribe((response) => {
        this.workPositionList = response?.records;
      });
  }
  onGenerateReportExcel(): void {
    this.disabledBtn = true;
    const workbookBin = this.makeExcel();
    const octetStream = this.binary2octet(workbookBin);
    saveAs(
      new Blob([octetStream], { type: "application/octet-stream" }),
      `Reporte de docentes.xls`
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
      cardId: "Identidad",
      gender: "Género",
      email: "Correo",
      phone: "Teléfono móvil",
      schoolName: "Escuela",
      addressState: "Estado",
      addressMunicipality: "Municipio",
      addressCity: "Ciudad",
      address: "Calles / carreras",
      specialty: "Grado instrucción",
      workPosition: "Cargo",
      // annualPreparationStatus: "Inscripción de la convención",
      status: "Estatus",
    };
    const keysOfInterest = [
      "firstName",
      "lastName",
      "cardId",
      "gender",
      "email",
      "phone",
      "schoolName",
      "addressState",
      "addressMunicipality",
      "addressCity",
      "address",
      "specialty",
      "workPosition",
      // "annualPreparationStatus",
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
          if (key === "gender") {
            cellValue = parseInt(cellValue) === 1 ? "Femenino" : "Masculino";
          }
          if (key === "specialty") {
            cellValue = cellValue.name;
          }
          if (key === "workPosition") {
            cellValue = cellValue.name;
          }

          // if (key === "annualPreparationStatus") {

          //   cellValue =
          //     cellValue === "1"
          //       ? "Preinscrito"
          //       : (cellValue =
          //           cellValue === "2" ? "Inscrito" : "No esta inscrito");
          // }
          return [`${mappedKeys[key]}`, cellValue];
        });
      const obj = mappedData.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        <any>{}
      );
      return obj;
    });
    const reportTitle = [["Reporte de docentes"]];
    // const columnHeaders = Object.keys(data[0]);
    const columnHeaders: string[] = Object.values(mappedKeys);

    const status = {
      "1": "Activo",
      "2": "Inactivo",
    };

    const matrixz = data.filter(
      (rows) => rows["Estatus"] === status[this.statusSelected.toString()]
    );

    const values = this.sortedValues(columnHeaders, matrixz);
    // console.log("matrix: ", matrixz);
    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: `Reporte de docentes`,
      Subject: "Data",
      Author: "AmbLeMa",
      CreatedDate: new Date(Date.now()),
    };

    workbook.SheetNames.push("Reporte de docentes");
    const matrix = [reportTitle, columnHeaders, ...values];
    const columns = XLSX.utils.aoa_to_sheet(matrix);
    workbook.Sheets["Reporte de docentes"] = columns;

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
      .getUserReport(
        "3",
        this.statusSelected,
        null,
        this.selectedAnnualConvention,
        this.workPositionSelected
      )
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

  onSaveConfirm(event) {
    this.subscriptionService = this.userTeacherService
      .updateTeacherStatus(event.newData.pecaId, event.newData.id, {
        annualPreparationStatus: event.newData.annualPreparationStatus,
      })
      .subscribe(
        (response) => {
          this.toastrService.updateSuccess(
            "Cambio de estatus",
            "Se ha cambiado el estatus de inscripción del docente."
          );
        },
        (err) => {}
      );
    event.confirm.resolve(); // <-- Return to previous stock status
  }

  changeData(){
    this.subscriptionService = this.userReporteService
      .getUserReport(
        "3",
        this.statusSelected,
        null,
        this.selectedAnnualConvention,
        this.workPositionSelected
      )
      .subscribe(
        (response) => {
          if (response.users.length) {
            this.data = response.users;
            this.source.load(this.data);
          } else {
            this.toast.info(
              "Información",
              "No hay registro en el estatus o configuración seleccionada"
            );
          }
        }
      );
  }
}
