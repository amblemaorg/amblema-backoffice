import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageForms } from '../form.messages';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: MessageForms;

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Zá-úÁ-Ú]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Zá-úÁ-Ú]*$')]),
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

    this.submitted = true;

  }
}
