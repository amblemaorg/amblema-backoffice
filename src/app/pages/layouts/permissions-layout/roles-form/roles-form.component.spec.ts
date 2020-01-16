import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesFormComponent } from './roles-form.component';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';

describe('RolesFormComponent', () => {
  let component: RolesFormComponent;
  let fixture: ComponentFixture<RolesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesFormComponent ],

      imports: [
        SharedFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
