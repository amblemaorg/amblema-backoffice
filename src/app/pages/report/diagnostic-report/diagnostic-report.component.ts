import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { Subscription } from 'rxjs';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.scss'],
  providers: [DatePipe]
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
    private datePipe: DatePipe,
    private schoolUsersService: SchoolUserService,
    private schoolYearService: SchoolYearService) {

    // -- Init school list --
    this.subscriptionService = this.schoolUsersService.getSchoolUsers().subscribe(schoolUsers => {
      schoolUsers.forEach(schoolUser => {
        this.schools.push({ id: schoolUser.id, name: schoolUser.name });
      });
    });

    // -- School year list --
    this.subscriptionService = this.schoolYearService.getSchoolYears().subscribe(schoolYears => {

      schoolYears.forEach(schoolYear => {
        this.schoolYears.push({
          id: schoolYear.id,
          name: `${this.datePipe.transform(schoolYear.startDate, 'dd/MM/yyyy')} 
          - ${this.datePipe.transform(schoolYear.endDate, 'dd/MM/yyyy')}`
        });
      });
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }
}
