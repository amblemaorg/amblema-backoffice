import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsLayoutComponent } from './permissions-layout.component';
import { NbCardModule } from '@nebular/theme';
import { RouterTestingModule } from '@angular/router/testing';

describe('PermissionsLayoutComponent', () => {
  let component: PermissionsLayoutComponent;
  let fixture: ComponentFixture<PermissionsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsLayoutComponent ],
      imports: [
        NbCardModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
