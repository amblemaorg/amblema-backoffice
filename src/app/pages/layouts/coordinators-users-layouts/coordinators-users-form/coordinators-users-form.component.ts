import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../shared/base-form';
import { ValidationService } from 'src/app/pages/forms/shared/services/validation.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
  styleUrls: ['./coordinators-users-form.component.scss']
})
export class CoordinatorsUsersFormComponent extends FormBase implements OnInit {

  // formCoordinators: FormGroup = new FormGroup({

  // })


  constructor( private validationService: ValidationService ) { super(); }

  ngOnInit() {

  }
}
