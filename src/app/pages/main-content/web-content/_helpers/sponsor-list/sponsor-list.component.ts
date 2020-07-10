import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user/sponsor-user.action';
import { Observable } from 'rxjs';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent implements OnInit {

  @Select( SponsorUserState.sponsorUsers ) users$: Observable< SponsorUser[]>;

  constructor() { }

  ngOnInit() {
  }

  onSelectSponsor( value: any ) {

  }

}
