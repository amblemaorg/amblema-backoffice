import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkPositionComponent } from "./work-position.component";

describe("WorkPositionComponent", () => {
  let component: WorkPositionComponent;
  let fixture: ComponentFixture<WorkPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPositionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
