import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
export class SelectSponsorComponent implements OnInit, OnChanges {
  @Select( SponsorUserState.sponsorUsers ) sponsorUsers$: Observable<SponsorUser[]>;
  @Input() control: AbstractControl | null = new FormControl();
  @Input() submitted: boolean;

  selectedSponsor;

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.selectedSponsor = this.control.value ? this.selectedSponsor : null;
  }

  onSelected( event: any ) {
    this.control.setValue( event ? event.id : null );

    this.selectedSponsor = event ? event.name : null;
  }
}
