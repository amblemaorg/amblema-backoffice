import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { Subscription } from 'rxjs';
import { ReadlyStatusConvert, FilterStatus } from 'src/app/helpers/utility';
import { PDFReport } from '../pdf-report.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-school-report',
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.scss'],
  providers: [ PDFReport, DatePipe ]
})
export class SchoolReportComponent implements OnInit, OnDestroy {

  subscriptionService: Subscription;

  settings: any = {

    noDataMessage: 'No hay registros',
    actions: {
      add: false,
      delete: false,
      edit: false
    },

    columns: {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      code: {
        title: 'Código',
        type: 'number'
      },
      email: {
        title: 'Correo',
        type: 'number'
      },
      phone: {
        title: 'Teléfono',
        type: 'string'
      },
      addressState: {
        title: 'Estado',
        type: 'string'
      },
      addressMunicipality: {
        title: 'Municipio',
        type: 'string'
      },
      addressHome: {
        title: 'Casa / Edificio',
        type: 'string'
      },
      addressZoneType: {
        title: 'Zona',
        type: 'string',
      },
      addressZone: {
        title: 'Dirección de la zona',
        type: 'string',
      },
      nGrades: {
        title: 'N° de grados',
        type: 'string',
      },
      nSections: {
        title: 'N° de secciones',
        type: 'string',
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
          return ReadlyStatusConvert( [{ status: row }] )[0].status;
        },
        filterFunction: FilterStatus
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
  ];

  statusSelected = '1';

  disabledBtn = false;


  constructor(
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService) { }

  async ngOnInit() {

    this.subscriptionService = this.userReporteService.getUserReport('2', '1').subscribe(usersActive => {

      this.data = usersActive.users;

      console.log(this.data);

      this.subscriptionService = this.userReporteService.getUserReport('2', '0').subscribe(response => {

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

  onGenerateReport(): void {
    this.disabledBtn = true;

    this.userReporteService.getUserReport('2', this.statusSelected).subscribe( response => {

      this.generatorReport.generateUserReport(response);

      setTimeout(() => {
        this.disabledBtn = false;
        this.cd.detectChanges();
      }, 3500);
    });
  }

}
