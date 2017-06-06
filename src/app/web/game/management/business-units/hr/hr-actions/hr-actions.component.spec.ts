import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrActionsComponent } from './hr-actions.component';

describe('HrActionsComponent', () => {
  let component: HrActionsComponent;
  let fixture: ComponentFixture<HrActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
