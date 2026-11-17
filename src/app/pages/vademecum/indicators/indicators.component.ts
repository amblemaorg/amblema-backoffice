import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { SortHelper } from 'src/app/_helpers/sort.helper';
import {
  IndicatorFilters,
  IndicatorsSummary,
  IndicatorTeacher,
} from 'src/app/_models/vademecum/indicators.model';
import { SheetType } from 'src/app/_models/vademecum/sheet-type.model';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { State } from 'src/app/_models/state.model';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { StateService } from 'src/app/services/state.service';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { TABLE_ICONS, VademecumServerSource, VademecumTableSources, vademecumTableSettings } from '../_shared/vademecum-table';
import { VademecumIndicatorsService } from 'src/app/services/vademecum/vademecum-indicators.service';
import { VademecumIndicatorsExportService } from 'src/app/services/vademecum/vademecum-indicators-export.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';

/** Escapa texto del usuario antes de usarlo en columnas `type: 'html'`. */
function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type AccountLike = { firstName: string; lastName: string; email: string };

function accountName(account: AccountLike): string {
  return `${account.firstName || ''} ${account.lastName || ''}`.trim() || account.email;
}

/** Nombre y correo en dos líneas (HTML escapado). */
function accountHtml(account: AccountLike): string {
  return `${escapeHtml(accountName(account))}<br><small>${escapeHtml(account.email)}</small>`;
}

const EMPTY_FILTERS: IndicatorFilters = {
  schoolYearId: null,
  stateId: null,
  schoolId: null,
  sheetTypeId: null,
  origin: null,
};

/** Vademécum › Indicadores (BO-10): totales, gráficos, rankings y listado de docentes. */
@Component({
  selector: 'app-vademecum-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
})
export class IndicatorsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly search$ = new Subject<void>();

  filters: IndicatorFilters = { ...EMPTY_FILTERS };

  schoolYears: SchoolYearEnrolled[] = [];
  states: State[] = [];
  private allSchools: SchoolUser[] = [];
  schools: SchoolUser[] = [];
  sheetTypes: SheetType[] = [];

  summary: IndicatorsSummary | null = null;
  loadingSummary = false;
  summaryFailed = false;

  // Gráficos
  typeChartData: ChartDataSets[] = [];
  typeChartLabels: Label[] = [];
  typeChartColors: Color[] = [];
  originChartData: number[] = [];
  originChartLabels: Label[] = ['Matrícula', 'Externos'];
  originChartColors: Color[] = [{ backgroundColor: ['#2c819a', '#F2A93B'] }];
  readonly typeChartOptions: ChartOptions = {
    responsive: true,
    legend: { display: false },
    scales: { yAxes: [{ ticks: { beginAtZero: true, precision: 0 } }] },
  };
  readonly originChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
  };

  // Rankings (listas cortas ya cargadas)
  readonly sheetsSource = new LocalDataSource();
  readonly teachersRankSource = new LocalDataSource();
  readonly schoolsSource = new LocalDataSource();
  readonly sheetsSettings = this.localSettings({
    sheet: { title: 'Ficha', valuePrepareFunction: (_: any, row: any) => `${row.sheet.code} · ${row.sheet.title}` },
    downloads: { title: 'Descargas' },
  });
  readonly teachersRankSettings = this.localSettings({
    account: { title: 'Docente', type: 'html', valuePrepareFunction: (_: any, row: any) => accountHtml(row.account) },
    downloads: { title: 'Descargas' },
  });
  readonly schoolsSettings = this.localSettings({
    school: {
      title: 'Escuela',
      type: 'html',
      valuePrepareFunction: (_: any, row: any) =>
        escapeHtml(row.school.name) + (row.school.stateName ? `<br><small>${escapeHtml(row.school.stateName)}</small>` : ''),
    },
    activeTeachers: { title: 'Docentes' },
    downloads: { title: 'Descargas' },
  });

  // Docentes (paginado en el servidor)
  teachersSource: VademecumServerSource;
  readonly teachersSettings: any;
  teacherQuery = '';
  exporting: 'xlsx' | 'pdf' | null = null;

  // Detalle de docente
  selectedTeacher: IndicatorTeacher | null = null;
  downloadsSource: VademecumServerSource | null = null;
  readonly downloadsSettings: any;

  constructor(
    private indicators: VademecumIndicatorsService,
    private exporter: VademecumIndicatorsExportService,
    private tableSources: VademecumTableSources,
    private taxonomy: VademecumTaxonomyService,
    private schoolYearService: SchoolYearService,
    private stateService: StateService,
    private schoolUserService: SchoolUserService,
    private toastr: CustomToastrService,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    const datePipe = new DatePipe(this.locale);
    const fmt = (value: string | null) => (value ? datePipe.transform(value, 'dd/MM/yyyy HH:mm') : '—');
    this.teachersSettings = vademecumTableSettings(
      {
        account: { title: 'Docente', type: 'html', valuePrepareFunction: (_: any, row: IndicatorTeacher) => accountHtml(row.account) },
        schools: {
          title: 'Escuelas',
          valuePrepareFunction: (_: any, row: IndicatorTeacher) =>
            row.schools.map((school) => school.name).join(', ') || '—',
        },
        origin: { title: 'Origen', valuePrepareFunction: (value: string) => (value === 'external' ? 'Externo' : 'Matrícula') },
        downloads: { title: 'Descargas' },
        lastDownloadAt: { title: 'Última descarga', valuePrepareFunction: fmt },
      },
      [{ name: 'view', title: TABLE_ICONS.view }],
      true,
    );
    this.downloadsSettings = vademecumTableSettings(
      {
        sheet: { title: 'Ficha', valuePrepareFunction: (_: any, row: any) => `${row.sheet.code} · ${row.sheet.title}` },
        type: { title: 'Tipo', valuePrepareFunction: (_: any, row: any) => row.sheet.sheetTypeName },
        school: { title: 'Escuela', valuePrepareFunction: (_: any, row: any) => row.school?.name || 'Externo' },
        schoolYear: { title: 'Año', valuePrepareFunction: (_: any, row: any) => row.schoolYear?.name },
        createdAt: { title: 'Fecha', valuePrepareFunction: fmt },
        isRedownload: {
          title: '',
          type: 'html',
          valuePrepareFunction: (value: boolean) => (value ? '<span class="redownload">Redescarga</span>' : ''),
        },
      },
      [],
      true,
    );
    this.teachersSource = this.tableSources.create('indicators/teachers', this.teacherFilters());
    this.teachersSource.loadError$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.toastr.error('Error', 'No se pudo cargar el listado de docentes.'));
  }

  /** Tabla de ranking local: sin filtros ni orden por columna, ni acciones. */
  private localSettings(columns: { [key: string]: any }): any {
    const prepared: { [key: string]: any } = {};
    Object.keys(columns).forEach((key) => (prepared[key] = { filter: false, sort: false, ...columns[key] }));
    return { ...vademecumTableSettings(prepared, [], false), hideSubHeader: true };
  }

  private teacherFilters(): { [key: string]: any } {
    return { ...this.filters, q: this.teacherQuery.trim() };
  }

  ngOnInit(): void {
    this.search$.pipe(debounceTime(350), takeUntil(this.destroy$)).subscribe(() => this.reloadTeachers());
    this.loadCatalogs();
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasDownloads(): boolean {
    return !!this.summary && this.summary.totals.downloads > 0;
  }

  get noCurrentYear(): boolean {
    return !!this.summary && this.summary.schoolYear === null && !this.filters.schoolYearId;
  }

  get hasFilters(): boolean {
    return (Object.keys(this.filters) as (keyof IndicatorFilters)[]).some((key) => !!this.filters[key]);
  }

  onFilterChange(): void {
    this.reload();
  }

  onStateChange(): void {
    this.filters.schoolId = null;
    this.applySchoolList();
    this.reload();
  }

  clearFilters(): void {
    this.filters = { ...EMPTY_FILTERS };
    this.applySchoolList();
    this.reload();
  }

  onTeacherSearch(): void {
    this.search$.next();
  }

  /** Exporta el listado de docentes con los filtros activos (BO-11). */
  exportTeachers(format: 'xlsx' | 'pdf'): void {
    if (this.exporting) {
      return;
    }
    this.exporting = format;
    this.indicators.exportTeachers(this.filters, this.teacherQuery).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (!data.records.length) {
          this.toastr.error('Sin datos', 'No hay docentes para exportar con estos filtros.');
        } else if (format === 'xlsx') {
          this.exporter.toExcel(data, this.filtersLabel());
        } else {
          this.exporter.toPdf(data, this.filtersLabel());
        }
        this.exporting = null;
      },
      (error) => {
        // La API responde 400 en `general` si hay más de 5000 filas.
        const detail = error?.error?.general?.[0]?.msg;
        this.toastr.error('Error', detail || 'No se pudo generar la exportación.');
        this.exporting = null;
      },
    );
  }

  /** Texto de los filtros activos para el encabezado del archivo (el año va aparte). */
  private filtersLabel(): string {
    const parts: string[] = [];
    const state = this.states.find((item) => item.id === this.filters.stateId);
    const school = this.schools.find((item) => item.id === this.filters.schoolId);
    const type = this.sheetTypes.find((item) => item.id === this.filters.sheetTypeId);
    if (state) {
      parts.push(`Región: ${state.name}`);
    }
    if (school) {
      parts.push(`Escuela: ${school.name}`);
    }
    if (type) {
      parts.push(`Tipo de ficha: ${type.name}`);
    }
    if (this.filters.origin) {
      parts.push(`Origen: ${this.filters.origin === 'external' ? 'Externos' : 'Matrícula'}`);
    }
    if (this.teacherQuery.trim()) {
      parts.push(`Búsqueda: ${this.teacherQuery.trim()}`);
    }
    return parts.join(' · ');
  }

  onOriginChange(origin: IndicatorFilters['origin']): void {
    this.filters.origin = origin;
    this.reload();
  }

  private reload(): void {
    this.closeTeacher();
    this.loadSummary();
    this.reloadTeachers();
  }

  private reloadTeachers(): void {
    this.teachersSource.setFilters(this.teacherFilters());
  }

  private loadCatalogs(): void {
    this.taxonomy.sheetTypes().pipe(takeUntil(this.destroy$)).subscribe(
      (types) => (this.sheetTypes = types),
      () => this.toastr.error('Error', 'No se pudieron cargar los tipos de ficha.'),
    );
    forkJoin([this.schoolYearService.getSchoolYears(), this.stateService.getState()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([years, states]) => {
          this.schoolYears = SortHelper.schoolYearsDesc(years as SchoolYearEnrolled[]);
          this.states = SortHelper.byName(states?.records || []);
        },
        () => this.toastr.error('Error', 'No se pudieron cargar los años escolares o las regiones.'),
      );
    this.schoolUserService.getSchoolUsers('id,name,addressState').pipe(takeUntil(this.destroy$)).subscribe(
      (schools) => {
        this.allSchools = SortHelper.byName(schools || []);
        this.applySchoolList();
      },
      () => this.toastr.error('Error', 'No se pudieron cargar las escuelas.'),
    );
  }

  /** Escuelas de la región elegida (addressState puede venir como id o como nombre). */
  private applySchoolList(): void {
    const state = this.states.find((item) => item.id === this.filters.stateId);
    this.schools = !this.filters.stateId
      ? this.allSchools
      : this.allSchools.filter(
          (school) =>
            school.addressState === this.filters.stateId || (!!state && school.addressState === state.name),
        );
  }

  private loadSummary(): void {
    this.loadingSummary = true;
    this.summaryFailed = false;
    this.indicators.summary(this.filters).pipe(takeUntil(this.destroy$)).subscribe(
      (summary) => {
        this.summary = summary;
        this.loadingSummary = false;
        if (!this.filters.schoolYearId && summary.schoolYear) {
          // Muestra el año vigente elegido por la API sin volver a consultar.
          this.filters.schoolYearId = summary.schoolYear.id;
        }
        this.buildCharts(summary);
        this.sheetsSource.load(summary.topSheets);
        this.teachersRankSource.load(summary.topTeachers);
        this.schoolsSource.load(summary.topSchools);
      },
      () => {
        this.loadingSummary = false;
        this.summaryFailed = true;
        this.toastr.error('Error', 'No se pudieron cargar los indicadores.');
      },
    );
  }

  private buildCharts(summary: IndicatorsSummary): void {
    this.typeChartLabels = summary.byType.map((item) => item.sheetType.name);
    this.typeChartData = [{ data: summary.byType.map((item) => item.downloads), label: 'Descargas' }];
    this.typeChartColors = [{ backgroundColor: summary.byType.map((item) => item.sheetType.color || '#2c819a') }];
    this.originChartData = [summary.byOrigin.enrollment, summary.byOrigin.external];
  }

  onTeacherAction(event: { action: string; data: IndicatorTeacher }): void {
    if (event.action === 'view') {
      this.openTeacher(event.data);
    }
  }

  openTeacher(teacher: IndicatorTeacher): void {
    this.selectedTeacher = teacher;
    this.downloadsSource = this.tableSources.create(`indicators/teachers/${teacher.account.id}/downloads`,
      { schoolYearId: this.filters.schoolYearId },
    );
    this.downloadsSource.loadError$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.toastr.error('Error', 'No se pudieron cargar las descargas del docente.'));
  }

  closeTeacher(): void {
    this.selectedTeacher = null;
    this.downloadsSource = null;
  }

  teacherName(account: AccountLike): string {
    return accountName(account);
  }

  trackById(_: number, item: { id?: string }): string | undefined {
    return item.id;
  }
}
