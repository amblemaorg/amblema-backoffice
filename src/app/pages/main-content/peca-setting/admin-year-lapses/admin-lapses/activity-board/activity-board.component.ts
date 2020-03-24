import { Component } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { SpecialToggleComponent } from '../special-toggle/special-toggle.component';
import { ModalService } from 'src/app/services/helper/modal.service';

@Component({
  selector: 'app-activity-board',
  templateUrl: './activity-board.component.html',
  styles: []
})
export class ActivityBoardComponent extends BaseTable implements TableActions {

  data: any = [
    {
      activity: 'Opción',
      status: ''
    },
    {
      activity: 'Taller inicial',
      status: ''
    },
    {
      activity: 'Planificación del primer lapso',
      status: ''
    },
    {
      activity: 'Venezuela Megadiversa',
      status: ''
    },
    {
      activity: 'Convención anual',
      status: ''
    }
  ];

  constructor(
    public modalService: ModalService
  ) {
    super('form-activity-lapse');

    this.settings.actions = false;

    // Custom columns
    this.settings.columns = {
      activity: {
        title: 'Actividad',
        type: 'string',
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

  onAction(event: any): void {}
}
