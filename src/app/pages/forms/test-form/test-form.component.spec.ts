import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormComponent } from './test-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveInputComponent } from '../reactive-form-components/reactive-input/reactive-input.component';
import { ReactiveValidationComponent } from '../reactive-form-components/reactive-validation/reactive-validation.component';
import { IdDocumentComponent } from '../reactive-form-components/id-document/id-document.component';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReactiveInputComponent,
        ReactiveValidationComponent,
        IdDocumentComponent,
        TestFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
