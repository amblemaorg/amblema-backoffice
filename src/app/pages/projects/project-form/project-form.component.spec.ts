import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { SelectCoordinatorComponent } from '../select-coordinator/select-coordinator.component';
import { SelectSponsorComponent } from '../select-sponsor/select-sponsor.component';
import { SelectSchoolComponent } from '../select-school/select-school.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NbButtonModule, NbSpinnerModule, NbToastrModule, NbThemeModule, NbAlertModule } from '@nebular/theme';
import { Utility } from 'src/app/helpers/utility';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectCoordinatorComponent,
        SelectSponsorComponent,
        SelectSchoolComponent,
        ProjectFormComponent,
        ProjectDetailsComponent,
      ],
      imports: [
        ModalModule,
        NbAlertModule,
        NgSelectModule,
        ReactiveFormsModule,
        FormsModule,
        NbSpinnerModule,
        NbToastrModule.forRoot(),
        NbButtonModule,
        HttpClientModule,
        NbThemeModule.forRoot(),
        NgxsModule.forRoot([]),
        ReactiveInputModule,
      ],
      providers: [
        Utility,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
