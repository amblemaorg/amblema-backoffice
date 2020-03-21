import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSponsorComponent } from './select-sponsor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';

describe('SelectSponsorComponent', () => {
  let component: SelectSponsorComponent;
  let fixture: ComponentFixture<SelectSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSponsorComponent ],
      imports: [
        ModalModule,
        ReactiveInputModule,
        NgSelectModule ]
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
