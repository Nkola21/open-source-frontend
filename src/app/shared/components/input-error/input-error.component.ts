import { Component, Input } from '@angular/core';
import {FormControl, AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent {

  @Input() control: AbstractControl;

}
