import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParloursComponent } from './parlour-list.component';

describe('ParloursComponent', () => {
  let component: ParloursComponent;
  let fixture: ComponentFixture<ParloursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParloursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParloursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
