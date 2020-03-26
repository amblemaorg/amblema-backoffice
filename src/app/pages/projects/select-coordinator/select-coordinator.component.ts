import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Select } from '@ngxs/store';
import { CoordinatorUserState } from 'src/app/store/user-store/coordinator-user.action';
import { Observable } from 'rxjs';
import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-coordinator',
  templateUrl: './select-coordinator.component.html',
  styleUrls: ['./select-coordinator.component.scss']
})
export class SelectCoordinatorComponent implements OnInit, OnChanges {
  @Select( CoordinatorUserState.coordinatorUsers ) coordinatorUsers$: Observable<CoordinatorUser[]>;
  @Input() control: AbstractControl | null = new FormControl();
  @Input() submitted: boolean;

  selectedCoordinator;

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.selectedCoordinator = this.control.value ? this.selectedCoordinator : null;
  }

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );
    this.selectedCoordinator = event ? event.name : null;
  }
}
