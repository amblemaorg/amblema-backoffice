import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
export class SelectSchoolComponent implements OnInit, OnChanges {
  @Select( SchoolUserState.schoolUsers ) schoolUsers$: Observable<SchoolUser[]>;
  @Input() control: AbstractControl | null = new FormControl();
  @Input() submitted: boolean;

  selectedSchool;

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selectedSchool = this.control.value ? this.selectedSchool : null; 
  }

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );
  
    this.selectedSchool = event ? event.name : null;
  }

}
