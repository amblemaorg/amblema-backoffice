import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GeneralEnrolledState } from 'src/app/store/_enrolled/enrolled.action';
import { Observable } from 'rxjs';
import { EnrolledSchool } from 'src/app/models/_enrolled/enrolled-school.model';

@Component({
  selector: 'app-school-admin',
  templateUrl: './school-admin.component.html',
  styles: []
})
export class SchoolAdminComponent implements OnInit {

  @Select( GeneralEnrolledState.availableSchools ) data$: Observable<EnrolledSchool[]>;

  constructor() { }

  ngOnInit() {
  }


}
