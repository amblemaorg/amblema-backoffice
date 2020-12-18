import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputEmailComponent } from './input-email.component';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';

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
        NbInputModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEmailComponent);
    component = fixture.componentInstance;

  });

  it('Fields - Should input email defined', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });
});
