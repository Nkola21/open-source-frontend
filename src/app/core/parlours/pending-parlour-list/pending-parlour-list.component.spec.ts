import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingParlourListComponent } from './pending-parlour-list.component';

describe('ParloursComponent', () => {
  let component: PendingParlourListComponent;
  let fixture: ComponentFixture<PendingParlourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingParlourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingParlourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
