import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {

  typeUsers = [
    { label: 'Padrino', value: 0 },
    { label: 'Coordinador', value: 1 },
    { label: 'Escuela', value: 2 },
    { label: 'Docente', value: 3 },
  ];

  typeUserSelected:number = 0;

  status = [
    { label: 'Activo', value: '0' },
    { label: 'Inactivo', value: '1' },
  ];

  statusSelected:string = '1';

  showCoordinatorCondition = false;

  constructor() { }

  ngOnInit() {
  }

}
