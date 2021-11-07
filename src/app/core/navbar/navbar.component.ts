import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select/select';
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
  loggedOut = true;

  constructor(public openService: OpenService,
    public service: CommonService,
    public router: Router) {
  }

  ngOnInit(): void {
    // const mode = localStorage.getItem('userMode');
    const isLoggedOut = localStorage.getItem('logged_out');
    this.user = this.openService.getUser();

    this.service.userData$.subscribe(res => {
      this.user = res;
    });

    this.service.data$.subscribe(res => {
      this.userMode = res;
    });
    if (isLoggedOut == 'true') {
      this.userMode = false
    } else {
      this.userMode = true
    }
    console.log("User Mode1: ", this.userMode);
    console.log("User: ", this.user);

    this.permission = this.openService.getPermissions();    
    this.getParlour();
  }

  newData() {
    this.service.changeData(false);  //invoke new Data
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
}
