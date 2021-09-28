import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbuttonsComponent } from './nav-buttons.component';

describe('NavbuttonsComponent', () => {
  let component: NavbuttonsComponent;
  let fixture: ComponentFixture<NavbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
