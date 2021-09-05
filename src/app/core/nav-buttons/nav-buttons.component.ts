import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';


@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavbuttonsComponent implements OnInit {
  user: any
  permission: any

  constructor(
    public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
  }

  // redirectToView(user_id, permission) {
  //   if (permission == 'Parlour') {
  //     this.redirectToParlourView(user_id);
  //   }else if (permission == 'Consultant') {
  //     this.redirectToConsultantView(user_id);
  //   }else if (permission == 'Admin') {
  //     this.redirectToAdminView(user_id);
  //   }
  // }

  redirectToMainMembersView() {
    const permission = this.permission.permission;
    const view = [`/main-members/all`];
    this.router.navigate(view);
  }

  redirectToPlansView() {
    const view = [`/plans/all`];
    this.router.navigate(view);
  }

  redirectToAdminView(user_id) {
    const view = [`/${this.permission.toLowerCase()}s/${user_id}/consultants`];
    this.router.navigate(view);
  }
}
