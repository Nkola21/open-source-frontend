import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailreminderComponent } from './emailreminder.component';

describe('EmailreminderComponent', () => {
  let component: EmailreminderComponent;
  let fixture: ComponentFixture<EmailreminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailreminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
