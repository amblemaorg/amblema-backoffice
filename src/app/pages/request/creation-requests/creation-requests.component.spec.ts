import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRequestsComponent } from './creation-requests.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

describe('CreationRequestsComponent', () => {
  let component: CreationRequestsComponent;
  let fixture: ComponentFixture<CreationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationRequestsComponent ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule
      ]
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
