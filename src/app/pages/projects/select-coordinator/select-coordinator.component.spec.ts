import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoordinatorComponent } from './select-coordinator.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store, NgxsModule } from '@ngxs/store';
import { CoordinatorUserState, GetCoordinatorUsers, SetCoordinatorUser } from 'src/app/store/user-store/coordinator-user.action';
import { Utility } from 'src/app/helpers/utility';
import { NbToastrModule, NbThemeModule } from '@nebular/theme';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { HttpClientModule } from '@angular/common/http';
import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';

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

  it('TestCase#3129 - should find coordinator', () => {

    const coordinator: CoordinatorUser = {
      id: 'id',
      name: 'usuario',
      email: 'usuairo@gmail.com',
      password: '2324234',
      userType: '2', 
      phone: '23423423',
      role: '34234234',
      addressState: 'Street',
      addressMunicipality: 'Palavecino',
      addressCity: 'Barquisimento',
      address: 'Cabudare', 
      gender: '2',
      addressHome: 'Edificio',
      firstName: 'usuario',
      lastName: 'usuari', 
      cardId: '234234324',
      cardType:'V',
      birthdate: '12/12/12',
      homePhone: '234234324',
      status: 'Activo'
    };

    store.dispatch( new SetCoordinatorUser(coordinator));
    store.dispatch( new GetCoordinatorUsers() ); 

    const user = store.selectSnapshot(state => state);  
    expect( user ).toBeDefined();
    
  });

  it('TestCase#3129 - should select coordinador after submit', () => {

  });
});
