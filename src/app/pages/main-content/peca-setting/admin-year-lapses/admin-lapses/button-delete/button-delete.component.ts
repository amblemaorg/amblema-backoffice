import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { Store } from '@ngxs/store';
import { DeleteLapseActivity } from 'src/app/store/lapse-activities.action';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { MenuSetUp } from 'src/app/pages/pages-menu-service';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.scss']
})
export class ButtonDeleteComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private menuService: MenuSetUp,
    private toastr: CustomToastrService,
    private store: Store,
    private lapseActivityService: LapseActivitiesService ) { }

  ngOnInit() {
  }

  onclick() {
    this.lapseActivityService.deleteActivity(this.rowData.id, this.rowData.lapse).subscribe( response => {
      this.toastr.deleteRegister('Eliminación', 'Se ha eliminado una actividad');
      this.store.dispatch( new DeleteLapseActivity( this.rowData.id, this.rowData.lapse ) );
      this.menuService.renderMenu(true);
    } );
  }
}
