import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMemberFormComponent } from './extended-member-form.component';

describe('MainMemberFormComponent', () => {
  let component: ExtendedMemberFormComponent;
  let fixture: ComponentFixture<ExtendedMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedMemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
