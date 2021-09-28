import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalExtendedMemberListComponent } from './additional-extended-member-list.component';

describe('MainMembersComponent', () => {
  let component: AdditionalExtendedMemberListComponent;
  let fixture: ComponentFixture<AdditionalExtendedMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalExtendedMemberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalExtendedMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
