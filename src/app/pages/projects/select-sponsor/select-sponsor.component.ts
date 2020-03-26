import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user-store/sponsor-user.action';
import { Observable } from 'rxjs';
import { SponsorUser } from 'src/app/models/user/sponsor-user.model';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-select-sponsor',
  templateUrl: './select-sponsor.component.html',
  styleUrls: ['./select-sponsor.component.scss']
})
export class SelectSponsorComponent {
  @Select( SponsorUserState.sponsorUsers ) sponsorUsers$: Observable<SponsorUser[]>;
  @Input() control: AbstractControl | null = new FormControl();

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );
  }
}
