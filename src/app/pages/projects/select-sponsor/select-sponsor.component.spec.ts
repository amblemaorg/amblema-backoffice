import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSponsorComponent } from './select-sponsor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { NgxsModule } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user-store/sponsor-user.action';
import { Utility } from 'src/app/helpers/utility';
import { HttpClientModule } from '@angular/common/http';
import { NbToastrModule, NbThemeModule } from '@nebular/theme';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

describe('SelectSponsorComponent', () => {
  let component: SelectSponsorComponent;
  let fixture: ComponentFixture<SelectSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSponsorComponent ],
      imports: [
        NbToastrModule.forRoot(),
        NbThemeModule.forRoot(),
        HttpClientModule,
        ModalModule,
        NgxsModule.forRoot([
          SponsorUserState
        ]), 
        ReactiveInputModule,
        NgSelectModule ], 
        providers: [
          CustomToastrService,
          Utility]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
