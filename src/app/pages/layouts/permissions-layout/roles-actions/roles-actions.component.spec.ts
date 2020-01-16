import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesActionsComponent } from './roles-actions.component';
import { RolesFormComponent } from '../roles-form/roles-form.component';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';

describe('RolesActionsComponent', () => {
  let component: RolesActionsComponent;
  let fixture: ComponentFixture<RolesActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RolesFormComponent,
        RolesActionsComponent ],
      imports: [
        SharedFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
