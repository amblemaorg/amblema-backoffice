import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  CYRILLIC_PATTERN,
  NUMBER_PATTERN,
} from './components/reactive-input/_shared/validation-patterns';
import { EMAIL_PATTERN } from '../../_components/form-components/shared/constant/validation-patterns-list';
import { AddressForm } from './abstract-address-form';
import { DOCUMENT_TYPE } from './components/form/identity-card/document-type-values';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';

export abstract class UserForm extends AddressForm {
  public nameMessage = `Nombre inválido. Debes agregar solo letras en este campo`;
  public lastNameMessage = `Apellido inválido. Debes agregar solo letras en este campo`;
  public emailMessage = `El correo electrónico no corresponde a un formato correcto`;
  public phoneMessage = `Número telefónico inválido, ingrese sólo números`;

  public form: FormGroup;

  public mode: string; // <-- Save the mode when change
  public role: string; // <-- Save the default role id
  public previousData: any; // <-- To back up previous data

  constructor() {
    super();
    this.form = new FormGroup({
      ...this.addressForm.controls,
      name: new FormControl(),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      role: new FormControl(null, [Validators.required]),
      status: new FormControl('1', [Validators.required]),
    });
  }

  public patchCardType(type: string): void {
    switch (type) {
      case DOCUMENT_TYPE.VENEZUELAN.LABEL:
        this.form.controls.cardType.setValue(DOCUMENT_TYPE.VENEZUELAN.VALUE);
        break;
      case DOCUMENT_TYPE.RIF.LABEL:
        this.form.controls.cardType.setValue(DOCUMENT_TYPE.RIF.VALUE);
        break;

      case DOCUMENT_TYPE.PASSPORT.LABEL:
        this.form.controls.cardType.setValue(DOCUMENT_TYPE.PASSPORT.VALUE);
        break;
    }
  }
}

export abstract class UserAdminForm extends UserForm {
  public functionMessage = `Dato inválido, agrega sólo letras`;

  constructor() {
    super();
    // -- Add attr admin --
    this.form = new FormGroup({
      ...this.form.controls,
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern(CYRILLIC_PATTERN),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern(CYRILLIC_PATTERN),
      ]),
      cardType: new FormControl('1', [Validators.required]),
      cardId: new FormControl(null), // <-- Other component update the validation
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(NUMBER_PATTERN),
      ]),
      function: new FormControl(null, [
        Validators.required,
        Validators.pattern(CYRILLIC_PATTERN),
      ]),
      userType: new FormControl( USER_TYPE.ADMIN.VALUE ),
    });
  }
}

export abstract class UserCoordinatorForm extends UserForm {
  constructor() {
    super();
  }
}

export abstract class UserSponsorForm extends UserForm {
  constructor() {
    super();
  }
}

export abstract class UserSchoolForm extends UserForm {
  constructor() {
    super();
  }
}
