import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlourFormComponent } from './parlour-form.component';

describe('ParlourFormComponent', () => {
  let component: ParlourFormComponent;
  let fixture: ComponentFixture<ParlourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParlourFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParlourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
