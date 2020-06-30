import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CYRILLIC_PATTERN } from "./reactive-input/_shared/validation-patterns";
import { EMAIL_PATTERN } from "../../_components/form-components/shared/constant/validation-patterns-list";

export abstract class UserForm {
  public nameMessage = `Nombre inválido. Debes agregar solo letras en este campo`;
  public lastNameMessage = `Apellido inválido. Debes agregar solo letras en este campo`;
  public emailMessage = `El correo electrónico no corresponde a un formato correcto`;

  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]),
    password: new FormControl(),
    role: new FormControl(null, [Validators.required]),
    addressState: new FormControl(),
    addressMunicipality: new FormControl(),
    addressCity: new FormControl(),
    address: new FormControl(),
  });
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
      cardType: new FormControl("1", [Validators.required]),
      cardId: new FormControl(null),
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
