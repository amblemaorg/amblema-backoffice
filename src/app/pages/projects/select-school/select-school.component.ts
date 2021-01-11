import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetSchoolUsers, SchoolUserState } from 'src/app/store/user/school-user.action';
import { Observable } from 'rxjs';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { AbstractControl, FormControl } from '@angular/forms';
import { ProjectState } from 'src/app/store/project.action';
import { Project } from 'src/app/_models/project.model';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';

@Component({
  selector: 'app-select-school',
  templateUrl: './select-school.component.html',
  styleUrls: ['./select-school.component.scss']
})
export class SelectSchoolComponent implements OnInit, OnChanges {
  @Select( SchoolUserState.schoolUsers ) schoolUsers$: Observable<SchoolUser[]>;
  @Select( ProjectState.project ) project$: Observable<Project>;
  @Input() control: AbstractControl | null = new FormControl();
  @Input() submitted: boolean;
  @Input() mode: string;

  selectedSchool;


  constructor(private store: Store) {
    store.dispatch( new GetSchoolUsers() )
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selectedSchool = this.control.value ? this.selectedSchool : null;

    if ( this.mode === ACTION.EDIT  ) {
      this.project$.subscribe( (response: any) => {
        this.selectedSchool = response.school.name;
      });
    }
  }

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );

    this.selectedSchool = event ? event.name : null;
  }

}
