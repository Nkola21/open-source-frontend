import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMemberViewComponent } from './extended-member-view.component';

describe('MainMemberViewComponent', () => {
  let component: ExtendedMemberViewComponent;
  let fixture: ComponentFixture<ExtendedMemberViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedMemberViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
