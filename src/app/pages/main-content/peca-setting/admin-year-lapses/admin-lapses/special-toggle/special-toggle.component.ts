import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { ViewCell } from 'ng2-smart-table';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Store } from '@ngxs/store';
import { UpdateStatusLapseActivity } from 'src/app/store/lapse-activities.action';
import { STATUS } from 'src/app/helpers/text-content/status';
import { MenuSetUp } from 'src/app/pages/pages-menu-service';

@Component({
  selector: 'app-special-toggle',
  templateUrl: './special-toggle.component.html',
  styleUrls: ['./special-toggle.component.scss']
})
export class SpecialToggleComponent implements ViewCell, OnInit {

  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  control: AbstractControl | null = new FormControl();

  constructor(
    private menuSetUp: MenuSetUp,
    private store: Store,
    private toatr: CustomToastrService,
    private lapseActivityService: LapseActivitiesService
  ) {}

  ngOnInit() {
    this.control.setValue( this.rowData.status === '1' ? true : false );
  }

  onclick() {

    // Prepare the data to update
    const value: any = {
      id: this.rowData.isStandard ? this.rowData.devName : this.rowData.id,
      lapse: this.rowData.lapse,
      isStandard: this.rowData.isStandard,
      status: this.control.value ? STATUS.ACTIVE.CODE : STATUS.INACTIVE.CODE
    };

    // Update the status
    this.lapseActivityService.statusActivity( value ).subscribe( response => {
      this.toatr.updateSuccess('Actualización', 'Se ha cambiado el estatus de una actividad');

      const newData: any = this.rowData;
      newData.status = this.control.value ? STATUS.ACTIVE.CODE : STATUS.INACTIVE.CODE;
      this.store.dispatch( new UpdateStatusLapseActivity( newData, newData.lapse ) );

      this.menuSetUp.renderMenu( true );
    });
  }
}
