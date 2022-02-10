import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { PDFReport } from "../pdf-report.service";
import { DatePipe } from "@angular/common";
import { PecaReportService } from "src/app/services/report/peca-report.service";
import { PDFReportPeca } from "./pdf-peca-report.service";
import { LocalDataSource } from "ng2-smart-table";
import { DomSanitizer } from "@angular/platform-browser";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

@Component({
  selector: "app-peca-report",
  templateUrl: "./peca-report.component.html",
  styleUrls: ["./peca-report.component.scss"],
  providers: [PDFReportPeca, DatePipe],
})
export class PecaReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;
  // -- 1 = coordinador, 2 = escuela -- 3 = Actividades
  filterType = null;
  matrix = [];
  filterSelected = "";
  multiSelectPlaceholder = "";
  multiSelectLapsePlaceholder = "Lapsos";
  dropdownList = [];
  dropdownListLapses = [];
  selectedItems = [];
  selectedLapseItems = [];
  dropdownSettings = {};
  dropdownLapseSettings = {};
  initialFilterData = [];
  lapseOptions = [];
  lapse = null;
  schoolYearsOptions = [];
  schoolYear = null;
  buttonDisabled = true;
  numOfColumns = 0;
  settings: any = {
    noDataMessage: "No hay registros",
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    columns: {},
  };

  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  constructor(
    private toast: CustomToastrService,
    private cd: ChangeDetectorRef,
    private pecaReportService: PecaReportService,
    private domSanitizer: DomSanitizer,
    private generateReporte?: PDFReportPeca
  ) {}

  ngOnInit() {
    this.subscriptionService = this.pecaReportService
      .getInitialData()
      .subscribe((response: any) => {
        if (response && response.status === 200) {
          const { data } = response.body;
          this.initialFilterData = data.schoolYears;
          const schoolYears = data.schoolYears.map((record, idx) => {
            return {
              name: record.name,
              id: record.name,
              back_id: record.id,
            };
          });
          this.schoolYearsOptions = schoolYears;
        }
      });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      enableCheckAll: true,
      searchPlaceholderText: `Buscar ${this.checkFilterName[this.filterType]}`,
    };
    this.dropdownLapseSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      enableCheckAll: true,
      searchPlaceholderText: `Buscar lapso`,
    };
  }

  onChangeSchoolYear(schoolYear: string) {
    this.schoolYear = schoolYear;
    this.filterType = null;
    this.dropdownList = [];
    this.dropdownListLapses = [];
    this.selectedLapseItems = [];
    this.fillLapseSelect();
  }
  fillLapseSelect() {
    const chunk = this.initialFilterData.find(
      (registry) => registry.name === this.schoolYear
    );
    const lapses = chunk.lapses.map((lapse: any) => {
      return {
        item_text: lapse.name,
        item_id: lapse.name,
      };
    });

    this.dropdownListLapses = lapses;
  }

  onChangeLapse(value) {
    this.lapse = value;
    this.filterType = null;
    this.dropdownList = [];
    this.selectedItems = [];
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  onSelectLapse(item: any) {
    this.filterType = null;
    this.selectedLapseItems.push(item);
  }
  onSelectAll(items: any) {
    this.selectedItems = [...this.selectedItems, ...items];
  }

  onSelectAllLapses(items: any) {
    this.filterType = null;
    this.selectedLapseItems = [...this.selectedLapseItems, ...items];
  }

  checkFilterName(filterId) {
    const filter = {
      "1": "Coordinadores",
      "2": "Escuelas",
      "3": "Actividades",
    };
    return filter[filterId];
  }

  onGenerateReport() {
    let body = {};
    const filterName = this.checkFilterName(this.filterType);
    const ids = this.selectedItems.map((item) => item.item_id);
    const uniqueIds = [...new Set(ids)];
    if (filterName === "Coordinadores") {
      body = { type_filter: "coordinator", coordinators: [...uniqueIds] };
    }
    if (filterName === "Escuelas") {
      body = { type_filter: "school", schools: [...uniqueIds] };
    }
    if (filterName === "Actividades") {
      console.log("initia data: ", this.initialFilterData);
      body = { type_filter: "activity", activities: [...uniqueIds] };
    }
    const lapses = this.selectedLapseItems.map(
      (lapseItem) => lapseItem.item_text
    );
    const uniqueLapses = [...new Set(lapses)];
    const schoolYear = this.schoolYearsOptions.find(
      ({ name }) => name === this.schoolYear
    );

    body = {
      ...body,
      lapses: [...uniqueLapses],
      schoolYear: schoolYear.back_id,
    };
    this.subscriptionService = this.pecaReportService
      .getReport(body)
      .subscribe((response) => {
        if (response && response.status >= 201) {
          console.log("response: ", response);
          const { columns, matriz } = response.body;
          this.numOfColumns = columns.length;
          const columnNames = columns.map((col) => col.name);
          let columnsData = {};

          columnNames.forEach((colName) => {
            columnsData = {
              ...columnsData,
              [`${colName}`]: {
                title: colName,
                type: "html",
                valuePrepareFunction: (data) => {
                  if (data === null || data === undefined) {
                    return;
                  }
                  if (data === 0) {
                    return (
                      '<p class="bg-danger text-center text-white font-weight-bold">' +
                      `${data}%` +
                      "</p>"
                    );
                  }
                  if (data > 0 && data < 100) {
                    console.log("inside data 1");
                    return (
                      '<p class="bg-warning text-center text-white font-weight-bold">' +
                      `${data}%` +
                      "</p>"
                    );
                  }
                  return (
                    '<p class="bg-success text-center text-white font-weight-bold">' +
                    `${data}%` +
                    "</p>"
                  );
                },
              },
            };
          });
          const data = matriz.map((row, i) => {
            const colName = columnNames[i];
            const rowData = {
              activity: row.activity,
            };
            columnNames.forEach((colName, idx) => {
              rowData[`${colName}`] = row?.columns[idx]
                ? row.columns[idx].value
                : null;
            });

            return rowData;
          });

          const newSettings = {
            ...this.settings,
            columns: {
              activity: {
                title: "Actividad",
                type: "string",
              },
              ...columnsData,
            },
          };

          this.settings = Object.assign({}, newSettings);
          this.data = data;
          this.matrixGeneration();
          this.source.load(this.data);
        } else {
          console.log("error: ", response);
        }
      });
  }

  matrixGeneration(): void {
    const columnsHeader = Object.keys(this.settings.columns).map(
      (columnHeader) => {
        if (columnHeader === "activity") {
          return "Actividades";
        }
        return columnHeader;
      }
    );
    let matrix = [];
    let row_aux = [];
    for (let count = 1, i = 0; count <= this.data.length; count++, i++) {
      let data = Object.values(this.data[i]);

      data = data.map((column) => {
        if (column === null || column === undefined) {
          return;
        }
        if (typeof column !== "number") {
          return column;
        }
        return `${column}%`;
      });
      row_aux.push(data);
    }
    matrix.push(columnsHeader);
    row_aux.forEach((student) => matrix.push(student));
    this.matrix = matrix;
  }

  ngOnDestroy(): void {}

  async exportDataPdf(): Promise<void> {
    const cleanedMatrix = this.matrix.map((rows, idx) => {
      const columns = rows.map((cell, colIdx) => {
        if (cell === undefined || cell === null) {
          return "";
        }
        return cell;
      });
      return columns;
    });
    return this.generateReporte.generateActivities(cleanedMatrix);
  }

  exportDataExcel(): void {
    const workbookBin = this.makeExcel();
    const octetStream = this.binary2octet(workbookBin);
    saveAs(
      new Blob([octetStream], { type: "application/octet-stream" }),
      `Data de reporte.xls`
    );
  }

  private binary2octet(binary): ArrayBuffer {
    const buffer = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      view[i] = binary.charCodeAt(i) & 0xff; // transformacion a octeto
    }
    return buffer;
  }

  changeType(value) {
    this.clearTable();
    this.filterType = value;
    const filterName = `${this.checkFilterName(this.filterType)}`;
    this.dropdownSettings = {
      ...this.dropdownSettings,
      searchPlaceholderText: `Buscar ${filterName.toLowerCase()}`,
    };
    this.multiSelectPlaceholder = `${filterName}`;
    this.fillMultiSelect();
  }

  makeExcel(): void {
    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: `Reporte de actividades del PECA`,
      Subject: "Data",
      Author: "Amblema",
      CreatedDate: new Date(Date.now()),
    };

    workbook.SheetNames.push("Reporte de actividades");

    const columns = XLSX.utils.aoa_to_sheet(this.matrix);
    workbook.Sheets["Reporte de actividades"] = columns;

    /* Exportar workbook como binario para descarga */
    const workbookBinary = XLSX.write(workbook, {
      type: "binary",
      bookType: "xls",
    });
    return workbookBinary;
  }

  clearTable() {
    this.data = [];
    const defaultSettings: any = {
      noDataMessage: "No hay registros",
      actions: {
        add: false,
        delete: false,
        edit: false,
      },
      columns: {},
    };
    this.settings = Object.assign({}, defaultSettings);
    this.dropdownList = [];
    this.selectedItems = [];
    this.source = new LocalDataSource();
  }

  fillMultiSelect() {
    const chunk = this.initialFilterData.find(
      (registry) => registry.name === this.schoolYear
    );
    let options = [];
    const filterName = this.checkFilterName(this.filterType);
    if (filterName === "Coordinadores") {
      options = chunk.coordinators.map((coordinator) => {
        return {
          item_id: coordinator.id,
          item_text: coordinator.name,
        };
      });
    }
    if (filterName === "Escuelas") {
      options = chunk.schools.map((school) => {
        return {
          item_id: school.id,
          item_text: school.name,
        };
      });
    }
    if (filterName === "Actividades") {
      console.log("initial data: ", this.initialFilterData);
      const chunk = this.initialFilterData.find(
        (registry) => registry.name === this.schoolYear
      );
      const selectedLapses = this.selectedLapseItems.map(
        (lapseItems) => lapseItems.item_text
      );

      const lapsesOfInterest = chunk.lapses.filter((lapse) =>
        selectedLapses.includes(lapse.name)
      );

      let allActivities = [],
        activitiesFiltered = [];

      lapsesOfInterest.forEach((lapse) => {
        allActivities = [...allActivities, ...lapse.activities];
      });

      const activitiesIds = allActivities.map((activity) => activity.devName);

      activitiesFiltered = allActivities.filter(
        ({ devName }, index) => !activitiesIds.includes(devName, index + 1)
      );

      options = activitiesFiltered.map((activity) => {
        return {
          item_id: activity.devName,
          item_text: activity.name,
        };
      });
    }
    this.dropdownList = options;
    return;
  }
}
