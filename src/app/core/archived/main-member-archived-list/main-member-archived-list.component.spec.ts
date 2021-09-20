import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberArchivedListComponent } from './main-member-archived-list.component';

describe('MainMembersComponent', () => {
  let component: MainMemberArchivedListComponent;
  let fixture: ComponentFixture<MainMemberArchivedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberArchivedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberArchivedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
