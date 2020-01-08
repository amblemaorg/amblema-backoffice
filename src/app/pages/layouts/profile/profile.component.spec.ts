import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { NbCardModule } from '@nebular/theme';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentificationDocumentComponent } from '../../forms/components/identification-document/identification-document.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IdentificationDocumentComponent,
        UserFormComponent,
        ProfileComponent ],
      imports: [
        NbCardModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
