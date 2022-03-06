import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberBulkAddComponent } from './main-member-bulk-add.component';

describe('MainMemberBulkAddComponent', () => {
  let component: MainMemberBulkAddComponent;
  let fixture: ComponentFixture<MainMemberBulkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberBulkAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberBulkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
