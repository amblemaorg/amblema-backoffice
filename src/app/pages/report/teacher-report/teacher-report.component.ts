import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PDFReport } from '../pdf-report.service';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { ReadlyStatusConvert, FilterStatus, ReadlyGender, FilterGender } from 'src/app/helpers/utility';

@Component({
  selector: 'app-teacher-report',
  templateUrl: './teacher-report.component.html',
  styleUrls: ['./teacher-report.component.scss'],
  providers: [ PDFReport, DatePipe ]
})
export class TeacherReportComponent implements OnInit, OnDestroy {

  subscriptionService: Subscription;

// Convenció  anual

  settings: any = {
    noDataMessage: 'No hay registros',
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    columns: {
      firstName: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      cardId: {
        title: 'Identidad',
        type: 'number'
      },
      gender: {
        title: 'Genero',
        type: 'string',
        valuePrepareFunction: ( row: any ) => {
          return ReadlyGender( row );
        },
        filterFunction: FilterGender,
      },
      email: {
        title: 'Correo',
        type: 'string'
      },
      phone: {
        title: 'Teléfono Móvil',
        type: 'number'
      },
      addressState: {
        title: 'Estado',
        type: 'string'
      },
      addressMunicipality: {
        title: 'Municipio',
        type: 'string'
      },
      addressCity: {
        title: 'Ciudad',
        type: 'string'

      },
      address: {
        title: 'Calles / carreras',
        type: 'string'
      },
      sponsor: {
        title: 'Padrino',
        type: 'string'
      },
      coordinator: {
        title: 'Coordinador',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          return ReadlyStatusConvert([{ status: row }])[0].status;
        },
        filterFunction: FilterStatus
      },
    }
  };

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
  ];

  disabledBtn = false;

  statusSelected = '1';
  selectedAnnualConvention = null;


  source: LocalDataSource = new LocalDataSource();
  data: any = [];


  constructor(

    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) { }

  async ngOnInit() {

    this.subscriptionService = this.userReporteService.getUserReport('3', '1').subscribe(usersActive => {

      this.data = usersActive.users;

      console.log( this.data );

      this.subscriptionService = this.userReporteService.getUserReport('3', '0').subscribe(response => {

        if (response.users.length) {
          this.data = [
            ...this.data,
            response.users
          ];
        }
        this.source.load(this.data);
      });
    });
  }

  async ngOnDestroy() {
    if (this.subscriptionService) { this.subscriptionService.unsubscribe(); }
  }

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.userReporteService.getUserReport(
      '3',
      this.statusSelected).subscribe(response => {

      this.generatorReport.generateUserReport(response);

      setTimeout(() => {
        this.disabledBtn = false;
        this.cd.detectChanges();
      }, 3500);
    });
  }
}
