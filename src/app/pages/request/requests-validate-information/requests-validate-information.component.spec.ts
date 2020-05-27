import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsValidateInformationComponent } from './requests-validate-information.component';
import { NbCardModule, NbDialogModule, NbDialogService, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { Utility } from 'src/app/helpers/utility';

describe('RequestsValidateInformationComponent', () => {
  let component: RequestsValidateInformationComponent;
  let fixture: ComponentFixture<RequestsValidateInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsValidateInformationComponent ],
      imports: [
        NbCardModule,
        ModalModule,
        NgxsModule.forRoot([  ]),
        Ng2SmartTableModule,
        NbThemeModule.forRoot(),
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot(),
      HttpClientModule,
      ],
      providers: [ Utility ]
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
