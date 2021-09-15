import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-emailreminder',
  templateUrl: './emailreminder.component.html',
  styleUrls: ['./emailreminder.component.css']
})
export class EmailreminderComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
