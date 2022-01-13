import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { Plan } from './../plans.model';


@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrls: ['./plan-view.component.css']
})
export class PlanViewComponent implements OnInit {
  plan: Plan;
  constructor(public openService: OpenService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.initPlan(id);
      }
    )
  }

  initPlan(plan_id: number) {
    this.openService.getUrl(`plans/${plan_id}/get`)
    .subscribe(
      (plan: Plan) => {
        this.plan = plan;
      },
      error => {
        console.log("error occured.");
      });
  }
}
