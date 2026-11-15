import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { CoevaluationReportService } from 'src/app/services/report/coevaluation-report.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import {
  SchoolYearEnrolledState,
  GetSchoolYearsEnrolled,
} from 'src/app/store/_enrolled/school-year-enrolled.action';
import { SchoolUserState, GetSchoolUsersCompact } from 'src/app/store/user/school-user.action';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { SortHelper } from 'src/app/_helpers/sort.helper';
import {
  CoevaluationReport,
  CoevaluationLevelCode,
  CoevaluationTeacherRow,
  CoevaluationStatus,
} from 'src/app/_models/report/coevaluation-report.model';
import { CoevaluationReportExport } from './coevaluation-report-export.service';

@Component({
  selector: 'app-coevaluation-report',
  templateUrl: './coevaluation-report.component.html',
  styleUrls: ['./coevaluation-report.component.scss'],
  providers: [CoevaluationReportExport],
})
export class CoevaluationReportComponent implements OnInit, OnDestroy {
  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  private schoolYears$: Observable<SchoolYearEnrolled[]>;
  @Select(SchoolUserState.schoolUsersCompact)
  schools$: Observable<SchoolUser[]>;

  schoolYearOptions$: Observable<SchoolYearEnrolled[]>;

  levelOptions: { code: CoevaluationLevelCode; label: string }[] = [
    { code: 'excellence', label: 'Docente HQS con Excelencia' },
    { code: 'commitment', label: 'Docente HQS con Compromiso' },
    { code: 'progress', label: 'Docente HQS en Avance' },
    { code: 'beginning', label: 'Docente HQS en Inicio' },
  ];

  selectedSchoolYear: SchoolYearEnrolled | null = null;
  selectedSchool: SchoolUser | null = null;
  selectedLevel: CoevaluationLevelCode | null = null;

  report: CoevaluationReport | null = null;
  loading = false;
  exporting = false;
  exportingFormat: 'pdf' | 'xlsx' | null = null;
  // Filas con los 15 ítems desplegados, por clave "pecaId:teacherId"
  expanded: { [key: string]: boolean } = {};

  private subscription: Subscription;

  constructor(
    private store: Store,
    private reportService: CoevaluationReportService,
    private exporter: CoevaluationReportExport,
    private toastr: CustomToastrService
  ) {}

  ngOnInit(): void {
    this.schoolYearOptions$ = this.schoolYears$.pipe(
      map((schoolYears) => schoolYears && SortHelper.schoolYearsDesc(schoolYears))
    );
    this.store.dispatch(new GetSchoolUsersCompact());
    this.store.dispatch(new GetSchoolYearsEnrolled());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (!this.selectedSchoolYear || this.loading || this.exporting) {
      return;
    }
    this.loading = true;
    this.report = null;
    this.expanded = {};
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.reportService
      .getReport(
        this.selectedSchoolYear.id,
        this.selectedSchool ? this.selectedSchool.id : null,
        this.selectedLevel
      )
      .subscribe(
        (report) => {
          this.loading = false;
          if (!this.hasData(report)) {
            this.toastr.info('Información', 'No se encontraron coevaluaciones con esos filtros');
          }
          this.report = report;
        },
        () => {
          this.loading = false;
          this.toastr.error('Error', 'No se pudo obtener la información del reporte');
        }
      );
  }

  hasData(report: CoevaluationReport | null): boolean {
    return !!report && report.bySchool.length > 0;
  }

  /** Bloquea ambos botones hasta que el archivo se generó y se entregó al navegador (evita doble clic). */
  async onExport(format: 'pdf' | 'xlsx'): Promise<void> {
    if (!this.hasData(this.report) || this.exporting) {
      return;
    }
    this.exporting = true;
    this.exportingFormat = format;
    try {
      const filters = this.filtersLabel();
      if (format === 'pdf') {
        await this.exporter.toPdf(this.report, filters);
      } else {
        await this.exporter.toExcel(this.report, filters);
      }
    } catch (e) {
      this.toastr.error('Error', 'No se pudo generar el archivo');
    } finally {
      // Se libera con un pequeño margen: los clics que el navegador encoló mientras
      // generaba el archivo se procesan antes y chocan con el bloqueo (no hay doble descarga).
      setTimeout(() => {
        this.exporting = false;
        this.exportingFormat = null;
      }, 800);
    }
  }

  filtersLabel(): string {
    const parts: string[] = [];
    parts.push(this.selectedSchool ? `Escuela: ${this.selectedSchool.name}` : 'Todas las escuelas');
    const level = this.levelOptions.find((l) => l.code === this.selectedLevel);
    parts.push(level ? `Nivel: ${level.label}` : 'Todos los niveles');
    return parts.join(' · ');
  }

  rowKey(pecaId: string, row: CoevaluationTeacherRow): string {
    return `${pecaId}:${row.teacherId}`;
  }

  toggle(pecaId: string, row: CoevaluationTeacherRow): void {
    const key = this.rowKey(pecaId, row);
    this.expanded[key] = !this.expanded[key];
  }

  itemTitle(num: number): string {
    const item = this.report ? this.report.instrument.items.find((i) => i.number === num) : null;
    return item ? item.title : `Ítem ${num}`;
  }

  fullName(row: CoevaluationTeacherRow): string {
    return `${row.firstName || ''} ${row.lastName || ''}`.trim();
  }

  cardLabel(row: CoevaluationTeacherRow): string {
    if (!row.cardId) {
      return '';
    }
    const prefix = row.cardType === '2' ? 'E' : 'V';
    return `${prefix}-${row.cardId}`;
  }

  formatNumber(value: number | null, decimals: number = 2): string {
    if (value === null || value === undefined) {
      return '—';
    }
    return Number.isInteger(value) ? `${value}` : value.toFixed(decimals).replace(/\.?0+$/, '');
  }

  statusClass(status: CoevaluationStatus): string {
    return `status-${status.replace(/_/g, '-')}`;
  }

  /** "Docente HQS con Excelencia" -> "Excelencia"; "Docente HQS en Avance" -> "En avance". */
  shortLevel(label: string | null): string {
    if (!label) {
      return '';
    }
    const short = label.replace(/^Docente HQS\s+/i, '').replace(/^con\s+/i, '').trim();
    return short.charAt(0).toUpperCase() + short.slice(1).toLowerCase();
  }

  levelClass(level: CoevaluationLevelCode | null): string {
    return level ? `level-${level}` : '';
  }
}
