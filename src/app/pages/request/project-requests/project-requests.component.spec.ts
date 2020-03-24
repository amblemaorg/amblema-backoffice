import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestsComponent } from './project-requests.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';

describe('ProjectRequestsComponent', () => {
  let component: ProjectRequestsComponent;
  let fixture: ComponentFixture<ProjectRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRequestsComponent ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
