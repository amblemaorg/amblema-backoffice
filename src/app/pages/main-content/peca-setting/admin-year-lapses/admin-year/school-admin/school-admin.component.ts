import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GeneralEnrolledState, SetEnrolledSchool } from 'src/app/store/_enrolled/enrolled.action';
import { Observable } from 'rxjs';
import { EnrolledSchool } from 'src/app/models/_enrolled/enrolled-school.model';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-school-admin',
  templateUrl: './school-admin.component.html',
  styles: []
})
export class SchoolAdminComponent {

  @Select( GeneralEnrolledState.availableSchools ) data$: Observable<EnrolledSchool[]>;

  selectedSchool: string;

  constructor(
    private store: Store,
    private enrolledService: EnrolledService,
    private taostr: CustomToastrService
  ) { }

  onEnrolledSchool() {
    this.enrolledService.enrollSchools( this.selectedSchool ).subscribe( response => {
      this.store.dispatch( new SetEnrolledSchool( this.selectedSchool ) );
      this.selectedSchool = null;
      this.taostr.updateSuccess('Actualización', 'Escuela inscrita en el año escolar');
    } );
  }
}
