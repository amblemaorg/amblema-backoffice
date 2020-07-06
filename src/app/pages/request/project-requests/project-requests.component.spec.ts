// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProjectRequestsComponent } from './project-requests.component';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { NbCardModule, NbAlertModule, NbToastrModule, NbThemeModule } from '@nebular/theme';
// import { ModalModule } from '../../_components/shared/modal/modal-forms/modal.module';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxsModule } from '@ngxs/store';
// import { ProjectRequestState } from 'src/app/store/request/project-requests.action';
// import { HttpClientModule } from '@angular/common/http';
// import { Utility } from 'src/app/_helpers/utility';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { ProgressModule } from '../../_components/shared/progress/progress.module';

// describe('ProjectRequestsComponent', () => {
//   let component: ProjectRequestsComponent;
//   let fixture: ComponentFixture<ProjectRequestsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ProjectRequestsComponent ],
//       imports: [
//         NbCardModule,
//         NgxsModule.forRoot([ ProjectRequestState ]),
//         NbThemeModule.forRoot(),
//         NbToastrModule.forRoot(),
//         HttpClientModule,
//         ModalModule,
//         NbAlertModule,
//         ProgressModule,
//         FormsModule,
//         ReactiveFormsModule,
//         Ng2SmartTableModule
//       ],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             params: of({id: 123})
//           }
//         },
//         Utility]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectRequestsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
