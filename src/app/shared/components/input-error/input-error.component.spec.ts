import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorComponent } from './input-error.component';
import {FormControl} from "@angular/forms";


describe('InputErrorComponent', () => {
  let component: InputErrorComponent;
  let fixture: ComponentFixture<InputErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputErrorComponent ],
      imports:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
