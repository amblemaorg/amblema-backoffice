import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { SchoolUserState } from 'src/app/store/user-store/school-user.action';
import { Observable } from 'rxjs';
import { SchoolUser } from 'src/app/models/user/school.model';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-school',
  templateUrl: './select-school.component.html',
  styleUrls: ['./select-school.component.scss']
})
export class SelectSchoolComponent {
  @Select( SchoolUserState.schoolUsers ) schoolUsers$: Observable<SchoolUser[]>;
  @Input() control: AbstractControl | null = new FormControl();

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );
  }
}
