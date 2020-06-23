import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { Subscription } from 'rxjs';
import { ReadlyStatusConvert, FilterStatus } from 'src/app/_helpers/utility';
import { PDFReport } from '../pdf-report.service';
import { DatePipe } from '@angular/common';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-school-report',
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.scss'],
  providers: [PDFReport, DatePipe],
})
export class SchoolReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;

  settings: any = {
    noDataMessage: 'No hay registros',
    actions: {
      add: false,
      delete: false,
      edit: false,
    },

    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      code: {
        title: 'Código',
        type: 'number',
      },
      email: {
        title: 'Correo',
        type: 'number',
      },
      phone: {
        title: 'Teléfono',
        type: 'string',
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
        type: 'string',
      },
      coordinator: {
        title: 'Coordinador',
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
    { label: 'Inactivo', value: '0' },
  ];

  statusSelected = '1';

  disabledBtn = false;

  constructor(
    private cd: ChangeDetectorRef,
    private toast: CustomToastrService,
    private generatorReport: PDFReport,
    private userReporteService: UserReportService
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport('2', '1')
      .subscribe((usersActive) => {
        this.data = usersActive.users;

        this.subscriptionService = this.userReporteService
          .getUserReport('2', '0')
          .subscribe((response) => {
            if (response.users.length) {
              this.data = [...this.data, response.users];
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

  onGenerateReport(): void {
    this.disabledBtn = true;

    this.userReporteService
      .getUserReport('2', this.statusSelected)
      .subscribe((response) => {
        if (response.users.length) {
          this.generatorReport.generateUserReport(response);
        } else {
          this.toast.info(
            'Información',
            'No hay registro en el estatus seleccionado'
          );
        }
        setTimeout(() => {
          this.disabledBtn = false;
          this.cd.detectChanges();
        }, 3500);
      });
  }
}