import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchoolComponent } from './select-school.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SponsorUserState } from 'src/app/store/user/sponsor-user.action';
import { NgxsModule } from '@ngxs/store';
import { Utility } from 'src/app/_helpers/utility';
import { HttpClientModule } from '@angular/common/http';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { NbToastrModule, NbThemeModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('SelectSchoolComponent', () => {
  let component: SelectSchoolComponent;
  let fixture: ComponentFixture<SelectSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSchoolComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NbToastrModule.forRoot(),
        NbThemeModule.forRoot(),
        HttpClientModule,
        NgxsModule.forRoot([SponsorUserState]),
        NgSelectModule],
        providers: [
          CustomToastrService,
          Utility]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSchoolComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
