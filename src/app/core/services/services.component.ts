import { Component, OnInit } from '@angular/core';
import { OpenService } from './../../shared/services/open.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(public openService: OpenService) { }

  ngOnInit(): void {
  }

}
