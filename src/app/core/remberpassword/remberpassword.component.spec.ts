import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemberpasswordComponent } from './remberpassword.component';

describe('RemberpasswordComponent', () => {
  let component: RemberpasswordComponent;
  let fixture: ComponentFixture<RemberpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemberpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemberpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
