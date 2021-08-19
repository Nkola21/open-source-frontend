import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberListComponent } from './main-member-list.component';

describe('MainMembersComponent', () => {
  let component: MainMemberListComponent;
  let fixture: ComponentFixture<MainMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
