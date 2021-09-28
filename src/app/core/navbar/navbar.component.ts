import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() user: any;
  permission: any;
  parlour: any;
  constructor(public openService: OpenService,
    public router: Router) { }

  ngOnInit(): void {
    this.user = this.openService.getUser();
    this.permission = this.openService.getPermissions();    
    this.getParlour();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.user;
  }

  handleLogout() {
    localStorage.clear();
    window.location.href = this.openService.getClientUrl();
    window.localStorage.setItem('logged_out', 'true');

  }

  getUsername() {
    const username = this.user.person_name ? this.user.person_name : `${this.user.first_name} ${this.user.last_name}`;
    return username;  
  }

  isParlour() {
    return this.permission == 'Parlour';
  }

  getParlour() {
    console.log(this.user);
    if (this.isParlour()) {
      this.parlour = this.user
    }else {
      this.parlour = this.user.parlour;
    }
  }
}
