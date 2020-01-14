import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtPaginationComponent } from './jwt-pagination.component';

describe('JwtPaginationComponent', () => {
  let component: JwtPaginationComponent;
  let fixture: ComponentFixture<JwtPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
