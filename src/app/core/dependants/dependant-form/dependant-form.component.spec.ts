import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantFormComponent } from './dependant-form.component';

describe('MainMemberFormComponent', () => {
  let component: DependantFormComponent;
  let fixture: ComponentFixture<DependantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
