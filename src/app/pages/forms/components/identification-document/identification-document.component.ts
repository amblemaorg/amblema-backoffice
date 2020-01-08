import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageForms } from '../../form.messages';

@Component({
  selector: 'app-identification-document',
  templateUrl: './identification-document.component.html',
  styleUrls: ['./identification-document.component.scss']
})
export class IdentificationDocumentComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public submitted: boolean;

  type = [{ value: 'V' }, { value: 'E' }, { value: 'J' }];

  messages = new MessageForms();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      documentNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(7),
        Validators.maxLength(8)
      ]),
      documentType: new FormControl(this.type[0].value, [Validators.required])
    });
  }

  get f() { return this.form.controls; }

  changeDocument(value: string) {
    switch (value) {
      case 'V':
        this.updateDocumentValidate(7, 8);
        break;
      case 'E':
        this.updateDocumentValidate(10, 10);
        break;
      case 'J':
        this.updateDocumentValidate(8, 9);
        break;
    }
  }

  private updateDocumentValidate(min: number, max: number) {
    this.form.controls.documentNumber.setValidators([Validators.minLength(min), Validators.maxLength(max)]);
    // Refresh the field after change validations
    this.form.controls.documentNumber.setValue(this.form.controls.documentNumber.value);
  }
}
