import { Component } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { EnrolledSchool } from 'src/app/models/_enrolled/enrolled-school.model';
import { Observable } from 'rxjs';
import { GeneralEnrolledState } from 'src/app/store/_enrolled/enrolled.action';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-school-board',
  templateUrl: './school-board.component.html',
  styles: [],
})
export class SchoolBoardComponent extends BaseTable {
  @Select(GeneralEnrolledState.enrolledSchools) data$: Observable<
    EnrolledSchool[]
  >;

  constructor() {
    super('form-admin-school');

    this.settings.actions = false;

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
}
