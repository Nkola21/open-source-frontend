import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSignInComponent } from './nav-signin.component';

describe('NavbarComponent', () => {
  let component: NavSignInComponent;
  let fixture: ComponentFixture<NavSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
