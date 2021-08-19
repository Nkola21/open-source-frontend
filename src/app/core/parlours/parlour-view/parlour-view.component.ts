import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { Parlour } from './../parlours.models';

@Component({
  selector: 'app-parlour-view',
  templateUrl: './parlour-view.component.html',
  styleUrls: ['./parlour-view.component.css']
})
export class ParlourViewComponent implements OnInit {
  parlour:Parlour;

  constructor(
    public openService: OpenService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.initParlour(id);
      }
    )
  }

  initParlour(parlour_id: number) {
    this.openService.getUrl(`parlour/${parlour_id}`)
    .subscribe(
      (parlour: Parlour) => {
        console.log(parlour);
        this.parlour = parlour;
      },
      error => {
        console.log("error occured.");
      });
  }

}
