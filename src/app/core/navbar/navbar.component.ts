import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenService, CurrentUserService } from 'src/app/shared/services/open.service';
import { Subject } from "rxjs";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  permission: any;
  parlour: any;
  isLoggedIn$: Observable<boolean>;

  constructor(public openService: OpenService,
    private currentUserService: CurrentUserService,
    public router: Router) { 
      currentUserService.userValue$.subscribe(currentUser => {
        console.log(currentUser);
        this.user = JSON.parse(currentUser);
       });
    }

  ngOnInit(): void {
    // this.isLoggedIn$ = this.openService.isLoggedIn;
    this.resetFormSubject.subscribe(response => {
      if(response){
        console.log('=')
       console.log(response);
      // Or do whatever operations you need.
      }
    });
    this.user = this.openService.getUser();
    this.permission = this.openService.getPermissions();    
    this.getParlour();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    console.log(changes.user.firstChange)
    this.user = changes.user.firstChange;
  }

  handleLogout() {
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
