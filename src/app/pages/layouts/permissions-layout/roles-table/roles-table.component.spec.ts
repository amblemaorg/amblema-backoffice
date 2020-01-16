import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesTableComponent } from './roles-table.component';
import { RolesFormComponent } from '../roles-form/roles-form.component';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterTestingModule } from '@angular/router/testing';

describe('RolesTableComponent', () => {
  let component: RolesTableComponent;
  let fixture: ComponentFixture<RolesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RolesFormComponent,
        RolesTableComponent ],
      imports: [
        SharedFormsModule,
        Ng2SmartTableModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
