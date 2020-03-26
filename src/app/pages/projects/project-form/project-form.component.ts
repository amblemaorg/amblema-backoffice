import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styles: []
})
export class ProjectFormComponent implements OnChanges, OnInit {

  @Input() mode: string;
  @Input() MODAL: string;

  title: string;

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      sponsor: new FormControl('', [Validators.required]),
      school: new FormControl('', [Validators.required]),
      coordinator: new FormControl('', [Validators.required])
    });
  }

  ngOnChanges(): void {
    this.title = this.mode === ACTION.CREATE ? 'Registrar proyecto' : 'Editar proyecto';
  }

  onSubmit(): void {
    this.submitted = true;

    console.log(

      this.form.value

    );

  }
}
