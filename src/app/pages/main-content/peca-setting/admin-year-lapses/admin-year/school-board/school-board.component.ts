import { Component } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { EnrolledSchool } from 'src/app/models/_enrolled/enrolled-school.model';
import { Observable } from 'rxjs';
import {
  GeneralEnrolledState,
  RemoveEnrolledShool,
} from 'src/app/store/_enrolled/enrolled.action';
import { Select, Store } from '@ngxs/store';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-school-board',
  templateUrl: './school-board.component.html',
  styles: [],
})
export class SchoolBoardComponent extends BaseTable {
  @Select(GeneralEnrolledState.enrolledSchools) data$: Observable<
    EnrolledSchool[]
  >;

  constructor(
    private store: Store,
    private toastr: CustomToastrService,
    private enrolledServices: EnrolledService
  ) {
    super('form-admin-school');

    this.settings.actions.custom = [
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
    ];

    this.settings.columns = {
      name: {
        title: 'Nombre de la escuela',
        type: 'string',
      },
      code: {
        title: 'Código del plantel',
        type: 'string',
      },
    };
  }

  onAction(event: any) {
    this.enrolledServices
      .removeEnrolledSchool(event.data.projectId)
      .subscribe((response) => {
        this.toastr.info(
          'Actualización',
          'La escuela seleccionada deja de estar inscrita'
        );
        this.store.dispatch(new RemoveEnrolledShool(event.data.projectId));
      });
  }
}
