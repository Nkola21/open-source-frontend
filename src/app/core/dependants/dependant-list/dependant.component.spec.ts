import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantListComponent } from './dependant-list.component';

describe('MainMembersComponent', () => {
  let component: DependantListComponent;
  let fixture: ComponentFixture<DependantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
