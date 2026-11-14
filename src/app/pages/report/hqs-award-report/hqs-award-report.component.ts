import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { HqsAwardReportService } from 'src/app/services/report/hqs-award-report.service';
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
  HqsAwardReport,
  HqsAwardSchool,
} from 'src/app/_models/report/hqs-award-report.model';
import { HqsAwardReportExport } from './hqs-award-report-export.service';

@Component({
  selector: 'app-hqs-award-report',
  templateUrl: './hqs-award-report.component.html',
  styleUrls: ['./hqs-award-report.component.scss'],
  providers: [HqsAwardReportExport],
})
export class HqsAwardReportComponent implements OnInit, OnDestroy {
  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  private schoolYears$: Observable<SchoolYearEnrolled[]>;
  @Select(SchoolUserState.schoolUsersCompact)
  schools$: Observable<SchoolUser[]>;

  schoolYearOptions$: Observable<SchoolYearEnrolled[]>;

  selectedSchoolYear: SchoolYearEnrolled | null = null;
  selectedSchool: SchoolUser | null = null;

  report: HqsAwardReport | null = null;
  loading = false;
  exporting = false;
  exportingFormat: 'pdf' | 'xlsx' | null = null;

  private subscription: Subscription;

  constructor(
    private store: Store,
    private reportService: HqsAwardReportService,
    private exporter: HqsAwardReportExport,
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.reportService
      .getReport(this.selectedSchoolYear.id, this.selectedSchool ? this.selectedSchool.id : null)
      .subscribe(
        (report) => {
          this.loading = false;
          if (!this.hasData(report)) {
            this.toastr.info('Información', 'No se encontraron escuelas con esos filtros');
          }
          this.report = report;
        },
        () => {
          this.loading = false;
          this.toastr.error('Error', 'No se pudo obtener la información del reporte');
        }
      );
  }

  hasData(report: HqsAwardReport | null): boolean {
    return !!report && report.schools.length > 0;
  }

  filtersLabel(): string {
    return this.selectedSchool ? `Escuela: ${this.selectedSchool.name}` : 'Todas las escuelas';
  }

  formatNumber(value: number | null, decimals: number = 2): string {
    if (value === null || value === undefined) {
      return '—';
    }
    return Number.isInteger(value) ? `${value}` : value.toFixed(decimals).replace(/\.?0+$/, '');
  }

  awardClass(school: HqsAwardSchool): string {
    return school.award ? `award-${school.award}` : `award-${school.status}`;
  }

  awardText(school: HqsAwardSchool): string {
    return school.awardLabel;
  }

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
      // Se libera tras un momento para evitar doble descarga por doble clic.
      setTimeout(() => {
        this.exporting = false;
        this.exportingFormat = null;
      }, 800);
    }
  }
}
