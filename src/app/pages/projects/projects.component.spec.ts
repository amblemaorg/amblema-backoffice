import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Utility } from 'src/app/helpers/utility';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ],
      imports: [
        Ng2SmartTableModule,
        NbCardModule ], 
      providers: [
        Utility
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
});
