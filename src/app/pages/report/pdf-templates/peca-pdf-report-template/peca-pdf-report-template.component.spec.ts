import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaPdfReportTemplateComponent } from './peca-pdf-report-template.component';

describe('PecaPdfReportTemplateComponent', () => {
  let component: PecaPdfReportTemplateComponent;
  let fixture: ComponentFixture<PecaPdfReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PecaPdfReportTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PecaPdfReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
