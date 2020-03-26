import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsFormComponent } from './steps-form.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { NbRadioModule, NbCheckboxModule, NbThemeModule, NbIconModule, NbListModule, NbToastrModule } from '@nebular/theme';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveDatepickerModule } from 'src/app/pages/components/form-components/reactive-datepicker/reactive-datepicker.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('StepsFormComponent', () => {
  let component: StepsFormComponent;
  let fixture: ComponentFixture<StepsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepsFormComponent ],
      imports: [
        NbThemeModule.forRoot(),
        ReactiveInputModule,
        NbRadioModule,
        NbListModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveDatepickerModule,
        NbIconModule,
        ReactiveInputFileModule,
        ReactiveTextAreaModule,
        NbCheckboxModule,

        NbToastrModule.forRoot({}),
        ModalModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
