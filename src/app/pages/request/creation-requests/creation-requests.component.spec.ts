import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRequestsComponent } from './creation-requests.component';
import { NbCardModule, NbAlertModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../../_components/shared/modal/modal-forms/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { UserCreationRequestState } from 'src/app/store/request/user-creation-request.action';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Utility } from 'src/app/_helpers/utility';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProgressModule } from '../../_components/shared/progress/progress.module';

describe('CreationRequestsComponent', () => {
  let component: CreationRequestsComponent;
  let fixture: ComponentFixture<CreationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationRequestsComponent ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule,
        ModalModule,
        NbAlertModule,
        FormsModule,
        HttpClientModule,
        NgxsModule.forRoot([ UserCreationRequestState ]),
        ReactiveFormsModule,
        NbThemeModule.forRoot(),
        ProgressModule,
        NbToastrModule.forRoot()
      ],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        Utility]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
