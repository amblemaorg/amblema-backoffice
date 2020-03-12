import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { SchoolUserState } from 'src/app/store/user-store/school-user.action';
import { Observable, Subscription } from 'rxjs';
import { SchoolUser } from 'src/app/models/user/school.model';

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
      console.log(this.data); 
      this.data = Object.assign( {}, this.data );

      this.data.status = this.data.status === '1' ? 'Activo' : 'Inactivo';
      this.data.phase = this.data.phase === '1' ? 'Inicio' :
      this.data.phase === '2' ? 'Interesado' : 'PECA';

    });
  }

}
