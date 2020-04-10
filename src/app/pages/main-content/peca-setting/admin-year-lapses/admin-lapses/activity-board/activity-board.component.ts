import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { SpecialToggleComponent } from '../special-toggle/special-toggle.component';
import { ModalService } from 'src/app/services/helper/modal.service';
import { Select } from '@ngxs/store';
import { LapseActivityState } from 'src/app/store/lapse-activities.action';
import { Observable } from 'rxjs';
import { LapseActivity } from 'src/app/models/lapse-activities.model';

@Component({
  selector: 'app-activity-board',
  templateUrl: './activity-board.component.html',
  styles: []
})
export class ActivityBoardComponent extends BaseTable implements TableActions, OnInit {

  @Select( LapseActivityState.lapses ) lapses$: Observable<LapseActivity>;

  data: any;

  constructor(
    public modalService: ModalService
  ) {
    super('form-activity-lapse');

    this.settings.actions = false;

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Actividad',
        type: 'text',
      },
      status: {
        title: 'Estatus',
        type: 'custom',
        renderComponent: SpecialToggleComponent,
        sort: true,
        filter: false,
        onComponentInitFunction(instance) {
          instance.save.subscribe();
        }
      }
    };
  }

  ngOnInit(): void {

    this.lapses$.subscribe( response => {

      this.data = response.lapse1;
    } );

  }

  onAction(event: any): void {}
}
