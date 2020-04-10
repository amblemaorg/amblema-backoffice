import { Component, OnInit, Input } from '@angular/core';
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

  @Select(LapseActivityState.lapses) lapses$: Observable<LapseActivity>;

  @Input() lapse: string;

  data: Array<any>;

  constructor(
    public modalService: ModalService
  ) {
    super('form-activity-lapse');

  }

  ngOnInit(): void {

    // Prepare the source data table
    this.lapses$.subscribe(response => {

      /* Give each activity a lapse */

      if (this.lapse === '1') {
        this.data = response.lapse1;
        this.data.forEach(value => {
          value.lapse = '1';
        });
      } else if (this.lapse === '2') {
        this.data = response.lapse2;
        this.data.forEach(value => {
          value.lapse = '2';
        });
      } else {
        this.data = response.lapse3;
        this.data.forEach(value => {
          value.lapse = '3';
        });
      }
    });

    // Setting columns
    this.settings.actions = false;
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
        onComponentInitFunction(instance: any) {
          instance.save.subscribe();
        }
      }
    };
  }

  onAction(event: any): void { }
}
