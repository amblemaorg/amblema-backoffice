import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsValidateInformationComponent } from './requests-validate-information.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

describe('RequestsValidateInformationComponent', () => {
  let component: RequestsValidateInformationComponent;
  let fixture: ComponentFixture<RequestsValidateInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsValidateInformationComponent ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsValidateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
