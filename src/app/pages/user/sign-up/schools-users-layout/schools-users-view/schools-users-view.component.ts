import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { SchoolUserState } from 'src/app/store/user/school-user.action';
import { Observable, Subscription } from 'rxjs';
import { SchoolUser } from 'src/app/_models/user/school.model';

@Component({
  selector: 'app-schools-users-view',
  templateUrl: './schools-users-view.component.html',
  styles: []
})
export class SchoolsUsersViewComponent implements OnInit {

  @Select( SchoolUserState.schoolUser ) data$: Observable<SchoolUser>;
  subscription: Subscription;

  data: any;

  constructor() { }

  ngOnInit() {

    this.data$ .subscribe( response => {
      this.data = response;

      this.data = Object.assign( {}, this.data );
      this.data.schoolShift = this.data.schoolShift === '1' ? 'Mañana' : this.data.schoolShift === '2' ? 'Tarde'
      : this.data.schoolShift === '3' ? 'Ambos' : null;
      this.data.schoolType = this.data.schoolType === '1' ? 'Nacional' :
      this.data.schoolType === '2' ? 'Estadal' : this.data.schoolType === '3' ? 'Municipal' : null;
      this.data.status = this.data.status === '1' ? 'Activo' : 'Inactivo';
      this.data.phase = this.data.phase === '1' ? 'Inicio' :
      this.data.phase === '2' ? 'Interesado' : 'PECA';

    });
  }

}
