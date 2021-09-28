import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalExtendedMemberViewComponent } from './additional-extended-member-view.component';

describe('MainMemberViewComponent', () => {
  let component: AdditionalExtendedMemberViewComponent;
  let fixture: ComponentFixture<AdditionalExtendedMemberViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalExtendedMemberViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalExtendedMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
