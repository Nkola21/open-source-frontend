import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, OpenService } from 'src/app/shared/services/open.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavbuttonsComponent implements OnInit {
  user: any
  permission: any
  parlour_id: any;
  parlour: any;
  subscription: Subscription;

  constructor(
    public openService: OpenService,
    private service: CommonService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.subscription = service.datasource$.subscribe(
      user => {
        this.user = user;
    });
    this.subscription = service.permissionDatasource$.subscribe(
      permission => {
      this.permission = permission;
      this.getParlour();
    });
  }

  ngOnInit(): void {
    const isLoggedOut = localStorage.getItem('logged_out');
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
    this.parlour_id = this.openService.getParlourId();
  }

  redirectToMainMembersList() {
    const view = [`/${this.permission.toLowerCase()}s/${this.user.id}/applicants`];

    if (`${this.openService.getClientUrl()}/#${view}` == document.URL) {
      window.location.reload();
    }else{
      this.router.navigate(view);
    }

  }

  redirectToPlansList() {
    const view = [`/parlours/${this.parlour_id}/plans`];
    this.router.navigate(view);
  }

  redirectToConsultantsList() {
    const view = [`/parlours/${this.user.id}/consultants`];
    this.router.navigate(view);
  }

  redirectToArchivedMainMembersList() {
    const permission = this.permission;
    const view = [`/parlours/${this.user.id}/archived-applicants`];
    this.router.navigate(view);
  }

  redirectToArchivedParloursList() {
    const permission = this.permission;
    const view = [`/parlours/archived-parlours`];
    this.router.navigate(view);
  }

  notConsultant(){
    return this.permission != 'Consultant';
  }

  getParlour() {
    if (this.isParlour()) {
      this.parlour = this.user
      this.parlour_id = this.parlour.id
    }else if (this.isConsultant()) {
      this.parlour = this.user.parlour;
      this.parlour_id = this.parlour.id
    }
  }

  isParlour() {
    return this.permission == 'Parlour';
  }

  isConsultant() {
    return this.permission == 'Consultant';
  }

  isAdmin() {
    return this.permission == 'admin';
  }
  getEntity() {
    return `${this.permission.toLowerCase()}s` 
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
