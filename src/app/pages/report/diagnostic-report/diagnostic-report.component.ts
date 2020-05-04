import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { Subscription } from 'rxjs';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { DatePipe } from '@angular/common';
import { DiagnosticReportService } from 'src/app/services/report/diagnostic-report.service';
import { PDFReport } from '../pdf-report.service';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.scss'],
  providers: [DatePipe, PDFReport]
})
export class DiagnosticReportComponent implements OnInit, OnDestroy {

  subscriptionService: Subscription;

  // -- School --
  schools = Array<any>();
  selectedSchool;

  // -- Setting checks --
  diagnostics = [
    { label: 'Matemática', value: false },
    { label: 'Lectura', value: false },
    { label: 'Lógica', value: false }
  ];

  // -- School Year --
  schoolYears = Array<any>();
  selectedSchoolYears;

  constructor(
    private generatorReport: PDFReport,
    private datePipe: DatePipe,
    private diagnosticsReportService: DiagnosticReportService,
    private schoolUsersService: SchoolUserService,
    private schoolYearService: SchoolYearService) {

  }

  async ngOnInit() {

    // -- Init school list --

    setTimeout(() => {
      this.subscriptionService = this.schoolUsersService.getSchoolUsers().subscribe(schoolUsers => {
        schoolUsers.forEach(schoolUser => {
          this.schools.push({ id: schoolUser.id, name: schoolUser.name });
        });
      });

    });

    // -- School year list --

    setTimeout(() => {
      this.subscriptionService = this.schoolYearService.getSchoolYears().subscribe(schoolYears => {

        schoolYears.forEach(schoolYear => {
          this.schoolYears.push({
            id: schoolYear.id,
            name: `${this.datePipe.transform(schoolYear.startDate, 'dd/MM/yyyy')}
            - ${this.datePipe.transform(schoolYear.endDate, 'dd/MM/yyyy')}`
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onGenerateReport() {

    this.subscriptionService = this.diagnosticsReportService.getReport(
      this.selectedSchoolYears.id,
      this.selectedSchool.id,
      this.diagnostics ).subscribe( response => {
        this.generatorReport.onGenerateDiagnosticReport( response );
      }, err => {
      } );
  }
}
