import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurwebsiteComponent } from './ourwebsite.component';

describe('OurwebsiteComponent', () => {
  let component: OurwebsiteComponent;
  let fixture: ComponentFixture<OurwebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurwebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurwebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
