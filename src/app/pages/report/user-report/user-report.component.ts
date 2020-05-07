import { Component, OnInit } from '@angular/core';
import { PDFReport } from '../pdf-report.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
  providers: [ PDFReport ]
})
export class UserReportComponent implements OnInit {

  typeUsers = [
    { label: 'Padrino', value: 0 },
    { label: 'Coordinador', value: 1 },
    { label: 'Escuela', value: 2 },
    { label: 'Docente', value: 3 },
  ];

  typeUserSelected = 0;

  status = [
    { label: 'Activo', value: '0' },
    { label: 'Inactivo', value: '1' },
  ];

  statusSelected = '0';
  selectedAmbLePensum = '0';

  constructor(
    private generatorReport: PDFReport,
  ) { }

  ngOnInit() {
  }

  onGenerateReport(): void {


    this.generatorReport.generateUserReport();


  }
}
