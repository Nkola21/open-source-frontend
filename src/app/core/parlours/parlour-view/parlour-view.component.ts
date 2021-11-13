import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { Parlour } from './../parlours.models';

@Component({
  selector: 'app-parlour-view',
  templateUrl: './parlour-view.component.html',
  styleUrls: ['./parlour-view.component.css']
})
export class ParlourViewComponent implements OnInit {
  parlour:Parlour;
  user: any;

  constructor(
    public openService: OpenService,
    public service: CommonService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.user = this.openService.getUser();
    this.transition(this.user);
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.initParlour(id);
      }
    )
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  initParlour(parlour_id: number) {
    this.openService.getUrl(`parlours/${parlour_id}`)
    .subscribe(
      (parlour: Parlour) => {
        this.parlour = parlour;
      },
      error => {
        console.log("error occured.");
      });
  }

}
