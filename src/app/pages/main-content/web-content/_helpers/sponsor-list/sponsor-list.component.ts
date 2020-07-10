import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user/sponsor-user.action';
import { Observable, Subscription } from 'rxjs';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss'],
})
export class SponsorListComponent implements OnInit, OnDestroy {
  @Select(SponsorUserState.sponsorUsers) users$: Observable<SponsorUser[]>;
  subscription: Subscription;
  dataPosition: any[] = [];

  constructor() {}

  ngOnInit() {
    this.subscription = this.users$.subscribe((response) => {
      response.forEach((value, key) => {
        this.dataPosition.push({ id: key + 1, name: (key + 1).toString() });
      });
      this.dataPosition.push({ id: null, name: 'Ultima posición' });
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onSelectSponsor(value: any) {}
}
