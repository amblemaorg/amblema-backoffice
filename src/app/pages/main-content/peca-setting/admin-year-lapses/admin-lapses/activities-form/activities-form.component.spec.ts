import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesFormComponent } from './activities-form.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { NbCheckboxModule, NbIconModule, NbListModule, NbToastrModule, NbThemeModule, NbAlertModule } from '@nebular/theme';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveDatepickerModule } from 'src/app/pages/components/form-components/reactive-datepicker/reactive-datepicker.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { LapseActivityState } from 'src/app/store/lapse-activities.action';
import { HttpClientModule } from '@angular/common/http';

describe('ActivitiesFormComponent', () => {
  let component: ActivitiesFormComponent;
  let fixture: ComponentFixture<ActivitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesFormComponent ],
      imports: [
        ModalModule,
        ReactiveTextAreaModule,
        ReactiveInputModule,
        ReactiveDatepickerModule,
        NbListModule,
        ReactiveFormsModule,
        FormsModule,
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot({}),
        NbIconModule,
        ReactiveInputFileModule,
        HttpClientModule,
        NgxsModule.forRoot([ LapseActivityState ]),

        NbAlertModule,
        NbCheckboxModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
