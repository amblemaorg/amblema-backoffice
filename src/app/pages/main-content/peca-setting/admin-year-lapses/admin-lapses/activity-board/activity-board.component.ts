import { Component, OnInit, Input } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/_helpers/base-table';
import { SpecialToggleComponent } from '../special-toggle/special-toggle.component';
import { ModalService } from 'src/app/services/helper/modal.service';
import { Select, Store } from '@ngxs/store';
import {
  LapseActivityState,
  GetLapActivities,
  SelectActivity,
} from 'src/app/store/lapse-activities.action';
import { Observable, Subscription } from 'rxjs';
import { Activity, LapseActivity } from 'src/app/_models/lapse-activities.model';
import { ButtonDeleteComponent } from '../button-delete/button-delete.component';
import { ButtonOrderComponent } from '../button-order/button-order.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-activity-board',
  templateUrl: './activity-board.component.html',
  styles: [],
})
export class ActivityBoardComponent extends BaseTable
  implements TableActions, OnInit {
  @Select(LapseActivityState.lapses) lapses$: Observable<LapseActivity>;
  @Select(LapseActivityState.selectedActivity) activity$: Observable<Activity>;

  subscription: Subscription;

  @Input() lapse: string;

  public canCreate = new AuthService().isAllowed(ALL_ACTIONS.ACTIVITY_CREATE);

  data: Array<any>;
  dataEdit: any;
  constructor(private store: Store, public modalService: ModalService) {
    super('form-activity-lapse');
  }

  ngOnInit() {
    // Prepare the source data table
    this.subscription = this.lapses$.subscribe((response) => {
      /* Give each activity a lapse */

      if (this.lapse === '1') {
        this.data = response.lapse1;

        this.data = Object.assign([], this.data);

        for (let index = 0; index < this.data.length; index++) {
          this.data[index] = Object.assign({}, this.data[index], {
            lapse: '1',
          });
        }
        this.source.load(this.data);
      } else if (this.lapse === '2') {
        this.data = response.lapse2;

        this.data = Object.assign([], this.data);

        for (let index = 0; index < this.data.length; index++) {
          this.data[index] = Object.assign({}, this.data[index], {
            lapse: '2',
          });
        }
        this.source.load(this.data);
      } else {
        this.data = response.lapse3;

        this.data = Object.assign([], this.data);

        for (let index = 0; index < this.data.length; index++) {
          this.data[index] = Object.assign({}, this.data[index], {
            lapse: '3',
          });
        }
        this.source.load(this.data);
      }
    });

    // Setting columns
    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: 'EDIT', title: `<i class="nb-edit"></i>` },
      ],
    }
    ;
    this.settings.columns = {
      name: {
        title: 'Actividad',
        type: 'text',
      },
      order: {
        title: 'Orden',
        type: 'number',
      },

    };

    if (new AuthService().isAllowed(ALL_ACTIONS.SCHOOL_YEAR_ENABLE_ACTIVITY)) {
      this.settings.columns = {
        ...this.settings.columns,
        status: {
          title: 'Estatus',
          type: 'custom',
          renderComponent: SpecialToggleComponent,
          sort: true,
          filter: false,
          onComponentInitFunction(instance: any) {
            instance.save.subscribe();
          },
        },
      };
    }

    if (new AuthService().isAllowed(ALL_ACTIONS.ACTIVITY_DELETE)) {
      this.settings.columns = {
        ...this.settings.columns,

        action: {
          width: '40px',
          title: 'Eliminar',
          type: 'custom',
          renderComponent: ButtonDeleteComponent,
          sort: true,
          filter: false,
          onComponentInitFunction(instance: any) {

            instance.save.subscribe();
          },
        },
        /*ordernar: {
          width: '40px',
          title: 'Ordenar',
          type: 'custom',
          renderComponent: ButtonOrderComponent,
          sort: true,
          filter: false,
          onComponentInitFunction(instance: any) {
            instance.save.subscribe();
          },
        }*/  
      };
    }

  }
  
  onAction(event: any): void {
    this.dataEdit = event.data;
    this.store.dispatch(new SelectActivity(event.data));
    this.modalService.open("modal-edit-activity"+this.lapse);
  }

  onUpdateState(value: any) {
    this.store.dispatch(new GetLapActivities());
  }
}
