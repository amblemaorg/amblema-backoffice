import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { PDFReport } from "../pdf-report.service";
import { DatePipe } from "@angular/common";
import { PecaReportService } from "src/app/services/report/peca-report.service";
import { LocalDataSource } from "ng2-smart-table";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-peca-report",
  templateUrl: "./peca-report.component.html",
  styleUrls: ["./peca-report.component.scss"],
  providers: [PDFReport, DatePipe],
})
export class PecaReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;
  // -- 1 = coordinador, 2 = escuela -- 3 = Actividades
  filterType = null;
  filterSelected = "";
  multiSelectPlaceholder = "";
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
    private generatorReport: PDFReport,
    private pecaReportService: PecaReportService,
    private domSanitizer: DomSanitizer
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
    if (filterName === "Coordinadores") {
      body = { type_filter: "coordinator", coordinators: [...ids] };
    }
    if (filterName === "Escuelas") {
      body = { type_filter: "school", schools: [...ids] };
    }
    if (filterName === "Actividades") {
      console.log("initia data: ", this.initialFilterData);
      body = { type_filter: "activity", activities: [...ids] };
    }
    this.subscriptionService = this.pecaReportService
      .getReport(body)
      .subscribe((response) => {
        if (response && response.status >= 201) {
          console.log("response: ", response);
          const { columns, matriz } = response.body;
          this.numOfColumns = columns.lenght;
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
          this.source.load(this.data);
        }
      });
  }

  ngOnDestroy(): void {}

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

  clearTable() {
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
