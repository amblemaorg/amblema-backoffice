import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectorComponent } from './role-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveValidationComponent } from '../reactive-form-components/reactive-validation/reactive-validation.component';
import { ReactiveInputComponent } from '../reactive-form-components/reactive-input/reactive-input.component';

describe('RoleSelectorComponent', () => {
  let component: RoleSelectorComponent;
  let fixture: ComponentFixture<RoleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReactiveInputComponent,
        ReactiveValidationComponent,
        RoleSelectorComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSelectorComponent);
    component = fixture.componentInstance;

    /**
     * Fixture must call only to test form
     * fixture.detectChanges();
     *
     */
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
