import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMemberArchivedListComponent } from './extended-member-archived-list.component';

describe('MainMembersComponent', () => {
  let component: ExtendedMemberArchivedListComponent;
  let fixture: ComponentFixture<ExtendedMemberArchivedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedMemberArchivedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedMemberArchivedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
