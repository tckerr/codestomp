import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentHiringComponent } from './development-hiring.component';

describe('DevelopmentHiringComponent', () => {
  let component: DevelopmentHiringComponent;
  let fixture: ComponentFixture<DevelopmentHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopmentHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
