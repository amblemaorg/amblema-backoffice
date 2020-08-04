import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  GeneralEnrolledState,
  SetEnrolledSchool,
  GetGeneralEnrolled,
} from 'src/app/store/_enrolled/enrolled.action';
import { Observable } from 'rxjs';
import { EnrolledSchool } from 'src/app/_models/_enrolled/enrolled-school.model';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import {
  SchoolYearEnrolledState,
  GetSchoolYearsEnrolled,
} from 'src/app/store/_enrolled/school-year-enrolled.action';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';

@Component({
  selector: 'app-school-admin',
  templateUrl: './school-admin.component.html',
  styles: [],
})
export class SchoolAdminComponent {
  @Select(GeneralEnrolledState.availableSchools) data$: Observable<
    EnrolledSchool[]
  >;
  @Select(SchoolYearEnrolledState.schoolYearActive) schoolActive$: Observable<
    SchoolYearEnrolled
  >;

  selectedSchool: string;

  constructor(
    private store: Store,
    private enrolledService: EnrolledService,
    private toastr: CustomToastrService
  ) {}

  onEnrolledSchool() {
    this.enrolledService
      .enrollSchools(this.selectedSchool)
      .subscribe((response) => {
        this.store.dispatch(new SetEnrolledSchool(this.selectedSchool));
        this.selectedSchool = null;
        this.toastr.updateSuccess(
          'Actualización',
          'Escuela inscrita en el año escolar'
        );
      });
  }

  onStartNewYearSchool() {
    this.enrolledService.setNewSchoolYear('names').subscribe((response) => {
      this.toastr.info('Información', 'Nuevo año escolar iniciado');
      this.store.dispatch(new GetGeneralEnrolled());
      this.store.dispatch(new GetSchoolYearsEnrolled());
    });
  }
}
