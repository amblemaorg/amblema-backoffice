import { Component, OnInit, Input } from '@angular/core';
import { AbstractReactive } from '../../../abstract-reactive';
import { Step } from 'src/app/models/step.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/helpers/text-content/status';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-form-simple-step',
  templateUrl: './form-simple-step.component.html',
  styleUrls: ['./form-simple-step.component.scss']
})
export class FormSimpleStepComponent extends AbstractReactive implements OnInit {

  @Input() data: Step;

  form: FormGroup;

  constructor(
    private stepService: StepService,
    private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      text: new FormControl(),
      status: new FormControl(false)
    });
  }

  async ngOnInit() {
    // Prepare the data in the form
    if (this.data) {
      if (this.data.hasText) {
        this.form.controls.text.setValidators([Validators.required]);
        this.form.updateValueAndValidity()
      }
      this.form.controls.status.setValue(this.data.status === STATUS.ACTIVE.CODE ? true : false);
    }
  }

  onSubmit(): void {

    if (this.form.valid) {

      this.data = Object.assign( {}, this.data); 

      this.data.text = this.form.controls.text.value; 
      this.data.status = this.form.controls.status.value ? STATUS.ACTIVE.CODE : STATUS.INACTIVE.CODE;

      /**
       * Update steps
       */
      

    }

  }
}
