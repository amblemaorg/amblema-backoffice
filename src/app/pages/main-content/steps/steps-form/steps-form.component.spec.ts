import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsFormComponent } from './steps-form.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { NbRadioModule, NbCheckboxModule, NbThemeModule } from '@nebular/theme';

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
        NbCheckboxModule,
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
