import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user-store/sponsor-user.action';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sponsors-users-view',
  templateUrl: './sponsors-users-view.component.html',
  styles: []
})
export class SponsorsUsersViewComponent implements OnInit, OnDestroy {

  @Select( SponsorUserState.sponsorUser ) data$: Observable<any>;
  subscription: Subscription;

  data: any;

  constructor() { }

  ngOnInit(): void {

    this.data$ .subscribe( response => {
      this.data = response;
      this.data = Object.assign( {}, this.data );

      this.data.status = this.data.status === '1' ? 'Activo' : 'Inactivo';

      this.data.phase = this.data.phase === '1' ? 'Inicio' :
      this.data.phase === '2' ? 'Interesado' : 'PECA';

      this.data.companyType = this.data.companyType === '1' ? 'Fabrica' :
         this.data.companyType === '2' ? 'Tienda' : this.data.companyType === '3' ? 'Negocio personal'
         : this.data.companyType === '4' ? 'Hacienda' : 'Otro' ;
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }
}
