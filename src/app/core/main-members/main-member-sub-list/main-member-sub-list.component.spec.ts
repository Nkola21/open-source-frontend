import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberSubListComponent } from './main-member-sub-list.component';

describe('MainMembersComponent', () => {
  let component: MainMemberSubListComponent;
  let fixture: ComponentFixture<MainMemberSubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberSubListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
