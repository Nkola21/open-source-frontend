import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlourViewComponent } from './parlour-view.component';

describe('ParlourViewComponent', () => {
  let component: ParlourViewComponent;
  let fixture: ComponentFixture<ParlourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParlourViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParlourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
