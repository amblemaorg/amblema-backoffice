import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputEmailComponent } from './input-email.component';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';

describe('InputEmailComponent', () => {
  let component: InputEmailComponent;
  let fixture: ComponentFixture<InputEmailComponent>;

  beforeEach(async(() => {
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
    fixture.detectChanges();
  });

  it('Fields - Should input email defined', () => {
    expect(component).toBeTruthy();
  });
});
