import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { DatePipe } from "@angular/common";
import { PecaReportService } from "src/app/services/report/peca-report.service";
import { PDFReportPeca } from "./pdf-peca-report.service";
import { LocalDataSource } from "ng2-smart-table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { SortHelper } from "src/app/_helpers/sort.helper";

/** Columna del reporte: un PECA (id único) con el nombre de la escuela o "coordinador - escuela". */
interface ReportColumn {
  id: string;
  name: string;
}

/** Fila del reporte: un encabezado de lapso (title) o una actividad con un valor por columna. */
interface ReportRow {
  activity: string;
  title: boolean;
  values: (number | null)[];
}

/** Vista en pantalla: actividades agrupadas bajo su lapso, con promedio por fila. */
interface ReportGroup {
  title: string | null;
  rows: { activity: string; values: (number | null)[]; average: number | null }[];
}

@Component({
  selector: "app-peca-report",
  templateUrl: "./peca-report.component.html",
  styleUrls: ["./peca-report.component.scss"],
  providers: [PDFReportPeca, DatePipe],
})
export class PecaReportComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private reportSubscription: Subscription;

  // -- 1 = coordinador, 2 = escuela -- 3 = Actividades
  filterType = null;
  matrix = [];
  multiSelectPlaceholder = "";
  multiSelectLapsePlaceholder = "Lapsos";
  dropdownList = [];
  dropdownListLapses = [];
  selectedItems = [];
  selectedLapseItems = [];
  dropdownSettings = {};
  dropdownLapseSettings = {};
  initialFilterData = [];
  schoolYearsOptions = [];
  schoolYear = null;
  loadingReport = false;
  settings: any = this.defaultSettings();

  source: LocalDataSource = new LocalDataSource();
  data: any = [];
  bodyTable: any = [];

  reportColumns: ReportColumn[] = [];
  private reportRows: ReportRow[] = [];

  // -- Vista en pantalla (no afecta Excel ni PDF) --
  reportGroups: ReportGroup[] = [];
  columnAverages: (number | null)[] = [];

  @ViewChild("pdfElement", { static: false }) pdfElement: ElementRef;

  constructor(
    private toast: CustomToastrService,
    private pecaReportService: PecaReportService,
    private generateReporte: PDFReportPeca
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.pecaReportService
        .getInitialData()
        .pipe(filter((event: any) => event.type === HttpEventType.Response))
        .subscribe(
          (response: any) => {
            const body = response.body || {};
            if (body.status_code !== "200" || !body.data) {
              this.toast.error("Reporte PECA", body.message || "No se pudieron cargar los períodos académicos");
              return;
            }
            this.initialFilterData = body.data.schoolYears;
            const schoolYears = body.data.schoolYears.map((record) => ({
              name: record.name,
              id: record.name,
              back_id: record.id,
            }));
            this.schoolYearsOptions = SortHelper.schoolYearsDesc(schoolYears);
          },
          (err: HttpErrorResponse) =>
            this.toast.error("Reporte PECA", this.errorMessage(err, "No se pudieron cargar los períodos académicos"))
        )
    );

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      enableCheckAll: true,
      searchPlaceholderText: "Buscar",
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.reportSubscription) {
      this.reportSubscription.unsubscribe();
    }
  }

  private schoolYearData() {
    return this.initialFilterData.find((registry) => registry.name === this.schoolYear);
  }

  onChangeSchoolYear(schoolYear: string) {
    this.schoolYear = schoolYear;
    this.selectedLapseItems = [];
    this.resetFilter();
    const chunk = this.schoolYearData();
    this.dropdownListLapses = (chunk ? chunk.lapses : []).map((lapse: any) => ({
      item_text: lapse.name,
      item_id: lapse.name,
    }));
  }

  /**
   * Cualquier cambio de lapsos invalida el filtro: la lista de actividades depende de los
   * lapsos y la tabla generada ya no corresponde. ngModel ya actualiza selectedLapseItems.
   */
  onLapsesChange() {
    this.resetFilter();
  }

  private resetFilter() {
    this.filterType = null;
    this.clearTable();
  }

  checkFilterName(filterId) {
    const filters = {
      "1": "Coordinadores",
      "2": "Escuelas",
      "3": "Actividades",
    };
    return filters[filterId];
  }

  onGenerateReport() {
    const filterName = this.checkFilterName(this.filterType);
    const uniqueIds = [...new Set(this.selectedItems.map((item) => item.item_id))];
    let body: any = {};
    if (filterName === "Coordinadores") {
      body = { type_filter: "coordinator", coordinators: uniqueIds };
    }
    if (filterName === "Escuelas") {
      body = { type_filter: "school", schools: uniqueIds };
    }
    if (filterName === "Actividades") {
      body = { type_filter: "activity", activities: uniqueIds };
    }
    const schoolYear = this.schoolYearsOptions.find(({ name }) => name === this.schoolYear);
    if (!schoolYear) {
      return;
    }
    body = {
      ...body,
      lapses: [...new Set(this.selectedLapseItems.map((lapseItem) => lapseItem.item_text))],
      schoolYear: schoolYear.back_id,
    };

    if (this.reportSubscription) {
      this.reportSubscription.unsubscribe();
    }
    this.loadingReport = true;
    this.reportSubscription = this.pecaReportService
      .getReport(body)
      .pipe(filter((event: any) => event.type === HttpEventType.Response))
      .subscribe(
        (response: any) => {
          this.loadingReport = false;
          const responseBody = response.body || {};
          if (responseBody.status_code !== "201") {
            this.clearReport();
            this.toast.error("Reporte PECA", responseBody.message || "No se pudo generar el reporte");
            return;
          }
          this.loadReport(responseBody.columns || [], responseBody.matriz || []);
          if (!this.reportColumns.length || !this.reportRows.length) {
            this.toast.info("Reporte PECA", "No hay datos para los filtros seleccionados");
          }
        },
        (err: HttpErrorResponse) => {
          this.loadingReport = false;
          this.clearReport();
          this.toast.error("Reporte PECA", this.errorMessage(err, "No se pudo generar el reporte"));
        }
      );
  }

  private loadReport(columns: ReportColumn[], matriz: any[]) {
    this.reportColumns = columns;
    this.reportRows = matriz.map((row) => ({
      activity: row.activity,
      title: !!row.title,
      values: columns.map((_, idx) => {
        const cell = row.columns && row.columns[idx];
        return cell && cell.value !== undefined ? cell.value : null;
      }),
    }));

    // Claves por id del PECA: dos columnas con el mismo nombre no se pisan
    const columnsData = {};
    columns.forEach((column) => {
      columnsData[this.columnKey(column)] = {
        title: column.name,
        type: "html",
        valuePrepareFunction: (value) => this.percentCellHtml(value),
      };
    });

    this.settings = {
      ...this.defaultSettings(),
      columns: {
        activity: { title: "Actividad", type: "string" },
        ...columnsData,
      },
    };

    this.data = this.reportRows.map((row) => {
      const rowData = { activity: row.activity };
      columns.forEach((column, idx) => (rowData[this.columnKey(column)] = row.values[idx]));
      return rowData;
    });

    this.buildView();
    this.matrixGeneration();
    this.source.load(this.data);
  }

  private buildView() {
    const groups: ReportGroup[] = [];
    this.reportRows.forEach((row) => {
      if (row.title) {
        groups.push({ title: row.activity, rows: [] });
        return;
      }
      if (!groups.length) {
        groups.push({ title: null, rows: [] });
      }
      groups[groups.length - 1].rows.push({
        activity: row.activity,
        values: row.values,
        average: this.average(row.values),
      });
    });
    this.reportGroups = groups.filter((group) => group.rows.length);
    this.columnAverages = this.reportColumns.map((_, idx) =>
      this.average(this.reportRows.filter((row) => !row.title).map((row) => row.values[idx]))
    );
  }

  /** Promedio ignorando las celdas que no aplican (null); null si no hay ninguna. */
  private average(values: (number | null)[]): number | null {
    const applicable = values.filter((value) => value !== null && value !== undefined);
    if (!applicable.length) {
      return null;
    }
    const sum = applicable.reduce((total, value) => total + value, 0);
    return Math.round((sum / applicable.length) * 10) / 10;
  }

  /** Clase de color de una celda de porcentaje en pantalla. */
  percentClass(value: number | null): string {
    if (value === null || value === undefined) {
      return "cell-na";
    }
    if (value <= 0) {
      return "cell-zero";
    }
    return value < 100 ? "cell-partial" : "cell-done";
  }

  private columnKey(column: ReportColumn): string {
    return `peca_${column.id}`;
  }

  private percentCellHtml(value: number | null): string {
    if (value === null || value === undefined) {
      return "";
    }
    let color = "bg-success";
    if (value <= 0) {
      color = "bg-danger";
    } else if (value < 100) {
      color = "bg-warning";
    }
    return `<p class="${color} text-center text-white font-weight-bold">${value}%</p>`;
  }

  /** Matriz para Excel y PDF: celda vacía = la actividad no aplica a ese PECA (igual que en la tabla). */
  matrixGeneration(): void {
    const header = ["Actividades", ...this.reportColumns.map((column) => column.name)];
    const rows = this.reportRows.map((row) => [
      row.activity,
      ...row.values.map((value) => (value === null ? "" : `${value}%`)),
    ]);
    this.matrix = [header, ...rows];
    this.prepareBodyToHtmlPdfMake();
  }

  /**
   * Set the data that peca-report-template component will use.
   * The template is recreated (bodyTable vacío y luego asignado) para que pagine el reporte nuevo.
   */
  private prepareBodyToHtmlPdfMake() {
    const titleRows = new Set(
      this.reportRows.map((row, idx) => (row.title ? idx + 1 : -1)).filter((idx) => idx > 0)
    );
    const cleanedMatrix = this.matrix.map((cells, rowIdx) =>
      cells.map((cell, colIdx) => (titleRows.has(rowIdx) && colIdx > 0 ? "" : `${cell}`))
    );
    const body = this.generateReporte.getBodyToPdfMake(cleanedMatrix);
    this.bodyTable = [];
    setTimeout(() => (this.bodyTable = body));
  }

  async exportDataPdf(): Promise<void> {
    this.generateReporte.generatePdfFromHtml(this.pdfElement);
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

  makeExcel(): any {
    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: `Reporte de actividades del PECA`,
      Subject: "Data",
      Author: "AmbLeMa",
      CreatedDate: new Date(Date.now()),
    };

    workbook.SheetNames.push("Reporte de actividades");

    const columns = XLSX.utils.aoa_to_sheet(this.matrix);
    workbook.Sheets["Reporte de actividades"] = columns;

    /* Exportar workbook como binario para descarga */
    return XLSX.write(workbook, {
      type: "binary",
      bookType: "xls",
    });
  }

  private defaultSettings(): any {
    return {
      noDataMessage: "No hay registros",
      actions: {
        add: false,
        delete: false,
        edit: false,
      },
      columns: {},
    };
  }

  /** Limpia solo el resultado generado (tabla, Excel y PDF). */
  private clearReport() {
    this.data = [];
    this.matrix = [];
    this.bodyTable = [];
    this.reportColumns = [];
    this.reportRows = [];
    this.settings = this.defaultSettings();
    this.reportGroups = [];
    this.columnAverages = [];
    this.source = new LocalDataSource();
  }

  /** Limpia el resultado y la selección del filtro. */
  clearTable() {
    this.clearReport();
    this.dropdownList = [];
    this.selectedItems = [];
  }

  /**
   * Opciones del filtro. Solo se ofrecen coordinadores/escuelas con PECA en el año escolar:
   * cualquier otro devolvería un reporte vacío.
   */
  fillMultiSelect() {
    const chunk = this.schoolYearData();
    const filterName = this.checkFilterName(this.filterType);
    let options = [];

    if (chunk && filterName === "Coordinadores") {
      options = (chunk.coordinators || []).map((coordinator) => ({
        item_id: coordinator.id,
        item_text: coordinator.name,
      }));
    }
    if (chunk && filterName === "Escuelas") {
      options = (chunk.schools || []).map((school) => ({
        item_id: school.id,
        item_text: school.name,
      }));
    }
    if (filterName === "Coordinadores" || filterName === "Escuelas") {
      options = SortHelper.byText(options, (option) => option.item_text);
    }
    if (chunk && filterName === "Actividades") {
      const selectedLapses = this.selectedLapseItems.map((lapseItem) => lapseItem.item_text);
      // devName identifica la actividad; se conserva la primera aparición si se repite entre lapsos
      const activities = new Map<string, string>();
      chunk.lapses
        .filter((lapse) => selectedLapses.includes(lapse.name))
        .forEach((lapse) =>
          lapse.activities.forEach((activity) => {
            if (!activities.has(activity.devName)) {
              activities.set(activity.devName, activity.name);
            }
          })
        );
      activities.forEach((name, devName) => options.push({ item_id: devName, item_text: name }));
    }

    if (!options.length) {
      this.toast.info("Reporte PECA", `No hay ${filterName.toLowerCase()} disponibles para la selección`);
    }
    this.dropdownList = options;
  }

  private errorMessage(err: HttpErrorResponse, fallback: string): string {
    return (err && err.error && err.error.message) || fallback;
  }
}
