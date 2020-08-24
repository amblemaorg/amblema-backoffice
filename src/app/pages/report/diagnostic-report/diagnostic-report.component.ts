import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DiagnosticReportService } from 'src/app/services/report/diagnostic-report.service';
import { PDFReport } from '../pdf-report.service';
import { Select } from '@ngxs/store';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { SchoolUserState } from 'src/app/store/user/school-user.action';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.scss'],
  providers: [DatePipe, PDFReport],
})
export class DiagnosticReportComponent implements OnInit, OnDestroy {
  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  data$: Observable<SchoolYearEnrolled[]>;
  @Select(SchoolUserState.schoolUsers)
  schools$: Observable<SchoolUser[]>;

  disabledBtn = false;
  subscriptionService: Subscription;

  // -- School --
  selectedSchool;

  // -- Setting checks --
  diagnostics = [
    { label: 'Matemática', value: false },
    { label: 'Lectura', value: false },
    { label: 'Lógica', value: false },
  ];

  // -- School Year --
  selectedSchoolYears;

  constructor(
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private diagnosticsReportService: DiagnosticReportService,
    private toastr: CustomToastrService
  ) {}

  async ngOnInit() {}

  ngOnDestroy(): void {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.diagnosticsReportService
      .getReport(
        this.selectedSchoolYears.id,
        this.selectedSchool.id,
        this.diagnostics
      )
      .subscribe(
        (response: any) => {

          if (response.sections.length) {
            this.generatorReport.onGenerate(response);
          } else {
            this.toastr.info('Información', 'No se encontraron registros');
          }

          setTimeout(() => {
            this.disabledBtn = false;
            this.cd.detectChanges();
          }, 3500);
        },
        (err: any) => {
          if (err.status === 404) {
            this.toastr.info('Información', 'No se encontraron registros');
          }

          this.disabledBtn = false;
          this.cd.detectChanges();
        }
      );
  }
}
