import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Utility } from 'src/app/helpers/utility';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ModalModule } from '../components/shared/modal/modal-forms/modal.module';
import { ModalService } from 'src/app/services/helper/modal.service';
import { ReactiveInputModule } from '../components/form-components/reactive-input/reactive-input.module';
import { SelectSponsorComponent } from './select-sponsor/select-sponsor.component';
import { SelectCoordinatorComponent } from './select-coordinator/select-coordinator.component';
import { SelectSchoolComponent } from './select-school/select-school.component';
import { NgSelectModule } from '@ng-select/ng-select';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectSponsorComponent,
        SelectCoordinatorComponent,
        SelectSchoolComponent,
        ProjectFormComponent,
        ProjectsComponent ],
      imports: [
        ModalModule,
        NgSelectModule,
        ReactiveInputModule,
        Ng2SmartTableModule,
        NbCardModule ],
      providers: [
        Utility,
        ModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('TestCase#2930 - Should module projects', () => {
    expect(component).toBeTruthy();
  });

  it('TestCase#2930 - Should defined columns Smart Table', () => {
    expect( component.settings.columns ).toBeDefined();
    expect( component.settings.columns.coordinator).toBeDefined();
    expect( component.settings.columns.school).toBeDefined();
    expect( component.settings.columns.sponsor ).toBeDefined();
    expect( component.settings.columns.phase ).toBeDefined();
    expect( component.settings.columns.status ).toBeDefined();
  });

  it('General - Convert and filter custom, smart table', () => {

    const data: any = component.valuePrepareFunction('1');
    expect( data ).toBe('Activo');

    const result: any = component.filterFunction('1', 'A');
    expect(result).toBe(true);
    expect(component.filterFunction( '1', 'E' )).toBeFalsy();
  });

  it('General - Should be undefined  on action smart table', () => {
    expect( component.onAction('')).toBeUndefined();
  });
});
