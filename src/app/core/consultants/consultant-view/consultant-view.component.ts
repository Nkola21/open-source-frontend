import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { Consultant } from './../consultants.models';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.css']
})
export class ConsultantViewComponent implements OnInit {
  consultant: Consultant;

  constructor(
    public openService: OpenService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.initParlour(id);
      }
    )
  }

  initParlour(consultant_id: number) {
    this.openService.getUrl(`consultants/${consultant_id}`)
    .subscribe(
      (consultant: Consultant) => {
        this.consultant = consultant;
      },
      error => {
        console.log("error occured.");
      });
  }

}
