import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CYRILLIC_PATTERN } from './reactive-input/_shared/validation-patterns';

export abstract class UserForm {
  public nameMessage = `Nombre inválido. Debes agregar solo letras en este campo`;

  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    addressState: new FormControl(),
    addressMunicipality: new FormControl(),
    addressCity: new FormControl(),
    address: new FormControl(),
  });
}

export abstract class UserAdminForm extends UserForm {
  public lastNameMessage = `Apellido inválido. Debes agregar solo letras en este campo`;
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
      cardType: new FormControl('1'),
      cardId: new FormControl(),
      phone: new FormControl(),
      function: new FormControl(null, [
        Validators.required,
        Validators.pattern(CYRILLIC_PATTERN),
      ]),
      status: new FormControl(),
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
