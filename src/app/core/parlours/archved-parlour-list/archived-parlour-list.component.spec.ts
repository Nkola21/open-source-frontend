import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedParlourListComponent } from './archived-parlour-list.component';

describe('ParloursComponent', () => {
  let component: ArchivedParlourListComponent;
  let fixture: ComponentFixture<ArchivedParlourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedParlourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedParlourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
