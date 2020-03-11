import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CoordinatorUserState } from 'src/app/store/user-store/coordinator-user.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coordinators-users-view',
  templateUrl: './coordinators-users-view.component.html',
  styleUrls: ['./coordinators-users-view.component.scss']
})
export class CoordinatorsUsersViewComponent implements OnInit {

  @Select( CoordinatorUserState.coordinatorUser ) data$: Observable<any>;

  data: any;

  constructor() { }

  ngOnInit() : void {
    this.data$.subscribe( response => {
      this.data = response; 

      console.log( this.data );
      this.data = Object.assign( {}, this.data );
      this.data.gender = this.data.gender === '2' ? 'Masculino' : 'Femenino';

    });
  }
}
