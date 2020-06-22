import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AdminUserState } from 'src/app/store/user-store/admin-user.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styles: []
})
export class AdminUserViewComponent implements OnInit {
  @Select( AdminUserState.adminUser ) data$: Observable<any>;

  data: any;

  ngOnInit(): void {
    this.data$.subscribe( response => {
      this.data = response;

      this.data = Object.assign( {}, this.data );
      this.data.status = this.data.status === '1' ? 'Activo' : 'Inactivo';
    });
  }
}
