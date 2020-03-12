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

  ngOnInit(): void {
    this.data$.subscribe( response => {
      this.data = response;
      this.data = Object.assign( {}, this.data );

      this.data.isReferred = this.data.isReferred ? 'Si' : 'No';
      this.data.gender = this.data.gender === '2' ? 'Masculino' : 'Femenino';
      this.data.status = this.data.status === '1' ? 'Activo' : 'Inactivo';

      this.data.phase = this.data.phase === '1' ? 'Inicio' : 
      this.data.phase === '2' ? 'Interesado' : this.data.phase === '3' ? 'Instruido' :
      this.data.phase === '4' ? 'Aprobado' : 'PECA';
    });
  }
}
