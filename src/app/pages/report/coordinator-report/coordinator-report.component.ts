import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { Subscription } from 'rxjs';
import {
  ReadlyStatusConvert,
  FilterStatus,
  FilterAmblemPensum,
} from 'src/app/_helpers/utility';
import { PDFReport } from '../pdf-report.service';
import { DatePipe } from '@angular/common';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-coordinator-report',
  templateUrl: './coordinator-report.component.html',
  styleUrls: ['./coordinator-report.component.scss'],
  providers: [PDFReport, DatePipe],
})
export class CoordinatorReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;

  settings: any = {
    noDataMessage: 'No hay registros',
    actions: {
      add: false,
      delete: false,
      edit: false,
    },

    columns: {
      firstName: {
        title: 'Nombre',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      phone: {
        title: 'Teléfono Móvil',
        type: 'number',
      },
      homePhone: {
        title: 'Teléfono de habitación',
        type: 'number',
      },
      addressState: {
        title: 'Estado',
        type: 'string',
      },
      addressMunicipality: {
        title: 'Municipio',
        type: 'string',
      },
      addressHome: {
        title: 'Casa / Edificio',
        type: 'string',
      },

      instructed: {
        title: 'AmbLePensum',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          
          return row ? 'Completado' : 'No completado';
        },
        filterFunction: FilterAmblemPensum,
      },
      profession: {
        title: 'Profesión',
        type: 'string',
      },
      schools: {
        title: 'Escuela(s) que apadrina',
        type: 'string',
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          return ReadlyStatusConvert([{ status: row }])[0].status;
        },
        filterFunction: FilterStatus,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '2' },
  ];

  statusSelected = '1';

  selectedAmbLePensum = null;

  disabledBtn = false;

  constructor(
    private cd: ChangeDetectorRef,
    private toast: CustomToastrService,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport('1', '1')
      .subscribe((usersActive) => {
        this.data = usersActive.users;
        this.subscriptionService = this.userReporteService
          .getUserReport('1', '2')
          .subscribe((response) => {

            if (response.users.length) {
              response.users.forEach((element) => {
                this.data = [...this.data, element];
              });
            }
            this.source.load(this.data);
          });
      });
  }

  async ngOnDestroy() {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.userReporteService
      .getUserReport('1', this.statusSelected, this.selectedAmbLePensum)
      .subscribe(
        (response) => {
          if (response.users.length) {
            this.generatorReport.generateUserReport(response);
          } else {
            this.toast.info(
              'Información',
              'No hay registro en el estatus o configuración seleccionada'
            );
          }

          setTimeout(() => {
            this.disabledBtn = false;
            this.cd.detectChanges();
          }, 3500);
        },
        () => (this.disabledBtn = false)
      );
  }
}
