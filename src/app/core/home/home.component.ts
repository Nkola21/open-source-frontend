import { Component, OnInit } from '@angular/core';
import { OpenService } from './../../shared/services/open.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public openService: OpenService) { }

  ngOnInit(): void {
  }

}
