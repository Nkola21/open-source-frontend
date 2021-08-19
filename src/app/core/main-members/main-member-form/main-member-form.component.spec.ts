import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemberFormComponent } from './main-member-form.component';

describe('MainMemberFormComponent', () => {
  let component: MainMemberFormComponent;
  let fixture: ComponentFixture<MainMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
