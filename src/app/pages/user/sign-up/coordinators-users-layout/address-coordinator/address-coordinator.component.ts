import { Component, OnInit, Input } from '@angular/core';
import {
  FormRegionaladdressComponent
} from 'src/app/pages/_components/form-components/forms/form-regional-address/form-regional-address.component';
import { AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-address-coordinator',
  templateUrl: './address-coordinator.component.html',
  styles: [`
  .button-left {
    border-radius: 0!important;
    border-top-left-radius: .25rem!important;
    border-bottom-left-radius: .25rem!important;
}

.button-right {
    border-radius: 0!important;
    border-top-right-radius: .25rem!important;
    border-bottom-right-radius: .25rem!important;
}

  `]
})
export class AddressCoordinatorComponent extends FormRegionaladdressComponent {

  @Input() addressHome: AbstractControl | null = new FormControl();
  @Input() addressCity: AbstractControl | null = new FormControl();
  public canCreate = new AuthService().isAllowed( ALL_ACTIONS.MUNICIPALITY_CREATE );
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.MUNICIPALITY_EDIT );
  public canDelete = new AuthService().isAllowed( ALL_ACTIONS.MUNICIPALITY_DELETE );


}
