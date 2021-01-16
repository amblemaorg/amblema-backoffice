import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CoordinatorUser } from 'src/app/_models/user/coordinator-user.model';
import { AbstractControl, FormControl } from '@angular/forms';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { ProjectState } from 'src/app/store/project.action';
import { Project } from 'src/app/_models/project.model';
import { CoordinatorUserState, GetCoordinatorUsers } from 'src/app/store/user/coordinator-user.action';

@Component({
  selector: 'app-select-coordinator',
  templateUrl: './select-coordinator.component.html',
  styleUrls: ['./select-coordinator.component.scss']
})
export class SelectCoordinatorComponent implements OnInit, OnChanges {
  @Select( CoordinatorUserState.coordinatorUsers ) coordinatorUsers$: Observable<CoordinatorUser[]>;
  @Select( ProjectState.project ) project$: Observable<Project>;

  @Input() control: AbstractControl | null = new FormControl();
  @Input() submitted: boolean;
  @Input() mode: string;

  selectedCoordinator;


  constructor(
    private store: Store
  ) {
    store.dispatch( new GetCoordinatorUsers() );
  }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.selectedCoordinator = this.control.value ? this.selectedCoordinator : null;

    if ( this.mode === ACTION.EDIT  ) {
      this.project$.subscribe( (response: any) => {
        this.selectedCoordinator = response.coordinator.name;
      });
    }
  }

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );

    this.selectedCoordinator = event ? event.name : null;
  }
}
