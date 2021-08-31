import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantViewComponent } from './consultant-view.component';

describe('ConsultantViewComponent', () => {
  let component: ConsultantViewComponent;
  let fixture: ComponentFixture<ConsultantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
