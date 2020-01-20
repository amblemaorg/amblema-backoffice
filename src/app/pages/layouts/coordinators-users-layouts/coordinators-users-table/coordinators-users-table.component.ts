import { Component, OnInit } from '@angular/core';
import { TableBase, TableActions } from 'src/app/helpers/base-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ACTION } from '../../../../helpers/text-crud';

@Component({
  selector: 'app-coordinators-users-table',
  templateUrl: './coordinators-users-table.component.html',
  styleUrls: ['./coordinators-users-table.component.scss']
})
export class CoordinatorsUsersTableComponent extends TableBase implements OnInit, TableActions {

  ACTION = ACTION;
  source: LocalDataSource = new LocalDataSource();
  data: any = [];

  constructor() {
    super();
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit() {  }

  onAction( event: any ) {
    switch (event.action) {
      case ACTION.VIEW :
        // Call view modal
        break;
      case ACTION.EDIT :
          // Change mode purpose
          // this.mode = ACTION.EDIT;
          // $(`#${this.ID_FORM}`).modal('show');
          break;
      case ACTION.DELETE :
        // Call delete modal
        break;
    }
  }

  newData(data: any) {

  }

  update(data: any) {

  }

}
