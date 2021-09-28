import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlourListComponent } from './parlour-list.component';

describe('ParloursComponent', () => {
  let component: ParlourListComponent;
  let fixture: ComponentFixture<ParlourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParlourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParlourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
