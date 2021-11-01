import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from "rxjs";
import { OpenService } from 'src/app/shared/services/open.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'open-source-frontend';
  isLoggedin = false;
  user: any = null;
  authId: any;
  fullPath: any;
  resetUserSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private openservice: OpenService) {}
  ngOnInit() {
    console.log("App: ", this.user);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("App: ", changes);
    this.user = changes.user.firstChange;
  }

  initPermissions() {
    this.openservice.getNonPaginatedResults(`users/${this.user.id}/permissions`)
      .subscribe(
        permissions => this.openservice.setPermissions(permissions),
        error => console.log("error"));
  }

  getCookieValue(key) {
    const cookies = document.cookie.split(';').map(w => w.trim());
    const vals = cookies.filter(w => w.startsWith(key + '='));
    if (vals.length === 0) {
      return null;
    }
    return vals[0].substring(key.length + 1);
  }

  takeAuthValuesFromCookie() {
    const userToken = this.getCookieValue('auth');
    this.openservice.setUserToken(userToken);
    this.authId = this.getCookieValue('user');
  }

  resetUser() {
    this.resetUserSubject.next(true);
 }
 
  handleSignIn(event) {
    this.openservice.setUserToken(event.token);
    this.openservice.setUser(event.user);
    this.user = event.user;
    this.initPermissions();
    this.resetUser();

  }
}
