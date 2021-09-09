import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  permission: any;

  constructor(public openService: OpenService,
    public router: Router) { }

  ngOnInit(): void {
    this.user = this.openService.getUser();
    this.permission = this.openService.getPermissions();    
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
}
