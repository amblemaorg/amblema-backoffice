import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user-store/sponsor-user.action';
import { Observable } from 'rxjs';
import { SponsorUser } from 'src/app/models/user/sponsor-user.model';

@Component({
  selector: 'app-select-sponsor',
  templateUrl: './select-sponsor.component.html',
  styleUrls: ['./select-sponsor.component.scss']
})
export class SelectSponsorComponent {
  @Select( SponsorUserState.sponsorUsers ) sponsorUsers$: Observable<SponsorUser[]>;
}
