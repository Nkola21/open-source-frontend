import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ourwebsite',
  templateUrl: './ourwebsite.component.html',
  styleUrls: ['./ourwebsite.component.css']
})
export class OurwebsiteComponent implements OnInit {

  constructor(public router: Router,
    public route:ActivatedRoute,) { }

  ngOnInit(): void {
  }

}
