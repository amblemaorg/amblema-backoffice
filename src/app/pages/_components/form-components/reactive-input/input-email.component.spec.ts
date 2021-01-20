import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputEmailComponent } from './input-email.component';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbFocusMonitor, NbInputModule } from '@nebular/theme';

describe('InputEmailComponent', () => {
  let component: InputEmailComponent;
  let fixture: ComponentFixture<InputEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
          InputEmailComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ReactiveValidationModule,
        NbInputModule,
        NbFocusMonitor,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEmailComponent);
    component = fixture.componentInstance;

  });


  afterEach(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });
});
