import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { Subscription } from 'rxjs';
import { ReadlyStatusConvert, FilterStatus } from 'src/app/helpers/utility';
import { PDFReport } from '../pdf-report.service';
import { DatePipe } from '@angular/common';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-sponsor-report',
  templateUrl: './sponsor-report.component.html',
  styleUrls: ['./sponsor-report.component.scss'],
  providers: [ PDFReport, DatePipe ]
})
export class SponsorReportComponent implements OnInit, OnDestroy {

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
        title: 'Nombre de la empresa',
        type: 'string'
      },
      companyRif: {
        title: 'RIF',
        type: 'number'
      },
      email: {
        title: 'Correo',
        type: 'string'
      },
      companyPhone: {
        title: 'Teléfono',
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
      schools: {
        title: 'Escuela(s) que apadrina',
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
    private toast: CustomToastrService,
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService) { }

  async ngOnInit() {

    this.subscriptionService = this.userReporteService.getUserReport('0', '1').subscribe(usersActive => {

      this.data = usersActive.users;
      this.subscriptionService = this.userReporteService.getUserReport('0', '0').subscribe(response => {
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

    this.userReporteService.getUserReport('0', this.statusSelected).subscribe( response => {

      if ( response.users.length ) {
        this.generatorReport.generateUserReport(response);
      } else {
        this.toast.info('Información', 'No hay registro en el estatus seleccionado');
      }

      setTimeout(() => {
        this.disabledBtn = false;
        this.cd.detectChanges();
      }, 3500);
    }, () => this.disabledBtn = false);
  }
}
