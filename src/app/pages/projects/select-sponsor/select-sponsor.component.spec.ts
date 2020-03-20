import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSponsorComponent } from './select-sponsor.component';

describe('SelectSponsorComponent', () => {
  let component: SelectSponsorComponent;
  let fixture: ComponentFixture<SelectSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSponsorComponent ]
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
