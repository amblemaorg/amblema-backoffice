import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IdDocumentComponent } from '../../forms/reactive-form-components/id-document/id-document.component';
import { ReactiveInputComponent } from '../../forms/reactive-form-components/reactive-input/reactive-input.component';
import { ReactiveValidationComponent } from '../../forms/reactive-form-components/reactive-validation/reactive-validation.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IdDocumentComponent,
        ReactiveInputComponent,
        ReactiveValidationComponent,
        ProfileComponent ],
      imports: [
        NbCardModule,
        FormsModule,
        ReactiveFormsModule,
        NbSelectModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
