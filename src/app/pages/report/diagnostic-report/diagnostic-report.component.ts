import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.scss']
})
export class DiagnosticReportComponent implements OnInit, OnDestroy {

  subscriptionService: Subscription;

  schools = [
    { id: 1, name: '' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];

  selectedSchool;

  diagnostics = [
    { label: 'Matemática', value : false },
    { label: 'Lectura', value: false },
    { label: 'Lógica', value: false }
  ];

  oneCheck = false;

  year = [
    { id: 1, name: '2020' },
    { id: 2, name: '2021' },
    { id: 3, name: '2023' },
    { id: 4, name: '2025' },
    { id: 5, name: '2029' }
  ];

  selectedYear;

  constructor( private schoolYearService: SchoolYearService ) {}

  ngOnInit() {

    this.schoolYearService.getSchoolYears().subscribe( response => {
      console.log( 'realizando la subscripton' );
    });
  }

  ngOnDestroy(): void {
    if ( this.subscriptionService ) {
      this.subscriptionService.unsubscribe();
    }
  }

}
