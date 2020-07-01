import { FormGroup, FormControl, Validators } from '@angular/forms';

export abstract class AddressForm {
  public addressForm: FormGroup = new FormGroup({
    addressState: new FormControl(null, [Validators.required]),
    addressMunicipality: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
  });
}
