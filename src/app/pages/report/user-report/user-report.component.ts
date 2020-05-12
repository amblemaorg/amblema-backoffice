import { Component, OnInit } from '@angular/core';
import { PDFReport } from '../pdf-report.service';
import { DatePipe } from '@angular/common';
import { UserReportService } from 'src/app/services/report/user-report.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
  providers: [ PDFReport, DatePipe ]
})
export class UserReportComponent implements OnInit {

  typeUsers = [
    { label: 'Padrino', value: 0 },
    { label: 'Coordinador', value: 1 },
    { label: 'Escuela', value: 2 },
    { label: 'Docente', value: 3 },
  ];

  typeUserSelected = '0';

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
  ];

  statusSelected = '1';
  selectedAmbLePensum = null;
  selectedAnnualConvention = '0';

  constructor(
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) { }

  ngOnInit() {
  }

  onGenerateReport(): void {

    this.userReporteService.getUserReport( this.typeUserSelected, this.statusSelected, this.selectedAmbLePensum).subscribe( response => {
      console.log(response);
      this.generatorReport.generateUserReport(response);
    });
  }
}
