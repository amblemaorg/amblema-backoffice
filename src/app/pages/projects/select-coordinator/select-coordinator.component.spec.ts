import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoordinatorComponent } from './select-coordinator.component';
import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';
import { Store, NgxsModule } from '@ngxs/store';
import { CoordinatorUserState } from 'src/app/store/user-store/coordinator-user.action';
import { Utility } from 'src/app/helpers/utility';
import { NbToastrModule, NbThemeModule } from '@nebular/theme';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { HttpClientModule } from '@angular/common/http';

describe('SelectCoordinatorComponent', () => {
  let component: SelectCoordinatorComponent;
  let fixture: ComponentFixture<SelectCoordinatorComponent>;

  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCoordinatorComponent ],
      imports: [
        NbToastrModule.forRoot(),
        NbThemeModule.forRoot(),
        HttpClientModule,
        NgxsModule.forRoot([ CoordinatorUserState ]),
        NgSelectModule ],
      providers: [
        CustomToastrService,
        Utility ]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
