import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  permission: any;
  parlour: any;
  isLoggedIn$: Observable<boolean>;
  userMode: boolean;
  subscription: Subscription;

  constructor(public openService: OpenService,
    public service: CommonService,
    public router: Router) {
      this.subscription = service.datasource$.subscribe(
        user => {
          this.user = user;
      });
  }

  ngOnInit(): void {
    this.user = this.openService.getUser();

    this.permission = this.openService.getPermissions();    
    this.getParlour();
  }

  logout() {
    this.handleLogout();
  }

  handleLogout() {
    this.userMode = false;
    this.openService.logout();
  }

  getUsername() {
    const username = this.user.person_name ? this.user.person_name : `${this.user.first_name} ${this.user.last_name}`;
    return username;  
  }

  isParlour() {
    return this.permission == 'Parlour';
  }

  isConsultant() {
    return this.permission == 'Consultant';
  }

  parlourName() {
    return this.parlour !== undefined ? this.parlour.parlour_name : null
  }

  hasParlourName() {
    return this.parlour == undefined
  }

  getParlour() {
    if (this.isParlour()) {
      this.parlour = this.user
    }else if (this.isConsultant()) {
      this.parlour = this.user.parlour;
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
