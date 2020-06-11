import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-year',
  templateUrl: './admin-year.component.html',
  styles: []
})
export class AdminYearComponent {

  @Select( SchoolYearEnrolledState.schoolYearsEnrolled ) data$: Observable<SchoolYearEnrolled[]>;

  constructor(
    private store: Store ) { }
}
