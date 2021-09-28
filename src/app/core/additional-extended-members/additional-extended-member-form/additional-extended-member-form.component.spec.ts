import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalExtendedMemberFormComponent } from './additional-extended-member-form.component';

describe('MainMemberFormComponent', () => {
  let component: AdditionalExtendedMemberFormComponent;
  let fixture: ComponentFixture<AdditionalExtendedMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalExtendedMemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalExtendedMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
