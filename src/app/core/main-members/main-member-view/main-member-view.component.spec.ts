import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberViewComponent } from './main-member-view.component';

describe('MainMemberViewComponent', () => {
  let component: MainMemberViewComponent;
  let fixture: ComponentFixture<MainMemberViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
