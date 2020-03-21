import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styles: []
})
export class ProjectFormComponent implements OnChanges, OnDestroy, OnInit {

  @Input() mode: string;
  @Input() MODAL: string;

  title: string;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl([Validators.required]),
      idSponsor: new FormControl([Validators.required]),
      idSchool: new FormControl([Validators.required]),
      idCoordinator: new FormControl([Validators.required])
    });
  }

  ngOnChanges(): void {
    this.title = this.mode === ACTION.CREATE ? 'Registrar proyecto' : 'Editar proyecto';
  }

  ngOnDestroy(): void {

  }

  onSubmit(): void {

  }
}
