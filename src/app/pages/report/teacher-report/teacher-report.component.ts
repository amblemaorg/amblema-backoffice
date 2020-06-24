import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PDFReport } from '../pdf-report.service';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import {
  ReadlyStatusConvert,
  FilterStatus,
  ReadlyGender,
  FilterGender,
} from 'src/app/_helpers/utility';
import { TeacherService } from 'src/app/services/user/teacher.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-teacher-report',
  templateUrl: './teacher-report.component.html',
  styleUrls: ['./teacher-report.component.scss'],
  providers: [PDFReport, DatePipe],
})
export class TeacherReportComponent implements OnInit, OnDestroy {
  subscriptionService: Subscription;

  settings: any = {
    noDataMessage: 'No hay registros',
    actions: {
      add: false,
      delete: false,
      edit: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    columns: {
      firstName: {
        title: 'Nombre',
        type: 'string',
        editable: false,
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
        editable: false,
      },
      cardId: {
        title: 'Identidad',
        type: 'number',
        editable: false,
      },
      gender: {
        title: 'Genero',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          return ReadlyGender(row);
        },
        filterFunction: FilterGender,
        editable: false,
      },
      email: {
        title: 'Correo',
        type: 'string',
        editable: false,
      },
      phone: {
        title: 'Teléfono Móvil',
        type: 'number',
        editable: false,
      },
      addressState: {
        title: 'Estado',
        type: 'string',
        editable: false,
      },
      addressMunicipality: {
        title: 'Municipio',
        type: 'string',
        editable: false,
      },
      addressCity: {
        title: 'Ciudad',
        type: 'string',
        editable: false,
      },
      address: {
        title: 'Calles / carrerass',
        type: 'string',
        editable: false,
      },
      annualPreparationStatus: {
        title: 'Inscripción de la convención',
        valuePrepareFunction: (row: any) => {
          return row === '1'
            ? 'Preinscripto'
            : row === '2'
            ? 'Inscrito'
            : 'No esta inscrito';
        },
        editor: {
          type: 'list',
          config: {
            list: [
              { value: null, title: 'No esta inscrito' },
              { value: '1', title: 'Preinscripto' },
              { value: '2', title: 'Inscrito' },
            ],
          },
        },
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          return ReadlyStatusConvert([{ status: row }])[0].status;
        },
        filterFunction: FilterStatus,
        editable: false,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '1', title: 'Activo' },
              { value: '2', title: 'Inactivo' },
            ],
          },
        },
      },
    },
  };

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
  ];

  disabledBtn = false;

  statusSelected = '1';

  // -- 1 = preinscrito, 2 = inscrito --
  selectedAnnualConvention = null;

  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  constructor(
    private cd: ChangeDetectorRef,
    private generatorReport: PDFReport,
    private toast: CustomToastrService,
    private userReporteService: UserReportService,
    private userTeacherService: TeacherService,
    private toastrService: CustomToastrService
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.userReporteService
      .getUserReport('3', '1')
      .subscribe((usersActive) => {
        this.data = usersActive.users;
        this.subscriptionService = this.userReporteService
          .getUserReport('3', '0')
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

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.userReporteService
      .getUserReport(
        '3',
        this.statusSelected,
        null,
        this.selectedAnnualConvention
      )
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

  onSaveConfirm(event) {
    this.subscriptionService = this.userTeacherService
      .updateTeacherStatus(event.newData.pecaId, event.newData.id, {
        annualPreparationStatus: event.newData.annualPreparationStatus,
      })
      .subscribe(
        (response) => {
          this.toastrService.updateSuccess(
            'Cambio de estatus',
            'Se ha cambiado el estatus de inscripción del docente.'
          );
        },
        (err) => console.log(err)
      );
    event.confirm.resolve(); // <-- Return to previous stock status
  }
}
