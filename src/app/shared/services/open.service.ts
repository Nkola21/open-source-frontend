import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export function trimWhiteSpace(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'string') {
        obj[prop] = obj[prop].trim();
      }
      if (typeof obj[prop] === "object"){
        trimWhiteSpace(obj[prop]);
      }
    }
  }
  return obj;
}


@Injectable({
  providedIn: 'root'
})
export class OpenService {

  private headerSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  header = this.headerSource.asObservable();
  constructor(private http: HttpClient) { }

  setBaseUrl(): void {
    localStorage.setItem('baseUrl', 'https://backend.osource.co.za/open-source');
  }

  getBaseUrl(): any {
    // return 'http://localhost:8009/open-source'
    return 'https://staging.osource.co.za/open-source';
    // return 'https://backend.osource.co.za/open-source';
  }

  getClientUrl(): any {
    // return 'http://localhost:5100'
    return 'https://nkosana-citiq.github.io/open-source-frontend'
    // return 'https://osource.co.za';
  }

  isProduction(): boolean {
    return this.getBaseUrl() === 'https://backend.osource.co.za/open-source';
  }

  isLocal(): boolean {
    return this.getBaseUrl() === 'http://localhost:8009/open-source';
  }

  logout() {
    localStorage.clear();
    window.location.href = this.getClientUrl();
    window.localStorage.setItem('logged_out', 'true');
  }

  setUserToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserToken(): any {
    return localStorage.getItem('token');
  }

  getHeaders() {
    let headers = new HttpHeaders();
    return headers;
  }

  getUnSecureHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    return headers;
  }

  getSecureHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getUserToken());
    return headers;
  }

  setLoggedIn() {
    localStorage.setItem('logged_out', 'false');
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('logged_out');
    return loggedIn == "false";
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setPermissions(permissions) {
    localStorage.setItem('permissions', permissions);
  }

  getPermissions() {
    return localStorage.getItem('permissions');
  }

  setParlourId(parlour_id) {
    localStorage.setItem('parlour_id', parlour_id);
  }

  getParlourId() {
    return localStorage.getItem('parlour_id');
  }

  isParlour() {
    return this.getPermissions() == 'Parlour';
  }

  isConsultant() {
    return this.getPermissions() == 'Consultant';
  }

  isAdmin() {
    return this.getPermissions() == 'Admin';
  }

  paramsToURLSearchParams(params: any): HttpParams {
    let searchParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key]) {
          searchParams = searchParams.set(key, params[key]);
        }
      }
    }
    return searchParams;
  }

  getMany(resource: string, params?: any) {
    const searchParams = this.paramsToURLSearchParams(params);
    const url = `${this.getBaseUrl()}/${resource}`;
    return this.http.get(url, { params: searchParams, headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getNonPaginatedResults(resource: string, params?: any) {
    const searchParams = this.paramsToURLSearchParams(params);
    const url = `${this.getBaseUrl()}/${resource}`;
    return this.http.get(url, { params: searchParams, headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    /* let errMsg = (error.message) ? error.message :
     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
     console.error(error); */ // log to console instead
    console.debug(error);
    return throwError(error);
  }

  getOne(resource: string) {
    const url = `${this.getBaseUrl()}/${resource}`;
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUrl(path: string): Observable<any> {
    const url = `${this.getBaseUrl()}/${path}`;
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getFile(path: string, filetype: string) {
    const url = `${this.getBaseUrl()}/${path}`;
    let headers = this.getHeaders();
    headers = headers.set('Accept', filetype);
    return this.http.get(url, { headers: headers, responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  postFile(path: string, obj: any) {
    const url = `${this.getBaseUrl()}/${path}`;
    let headers = this.getHeaders();
    return this.http
      .post(url, obj, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  putUrl(path: string, obj: any): Observable<any> {
    const url = `${this.getBaseUrl()}/${path}`;
    let headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(url, JSON.stringify(obj), { headers: headers })
      .pipe(catchError(this.handleError));
  }

  put(resource: string, obj: any): Observable<any> {
    const url = `${this.getBaseUrl()}/${resource}`;
    let headers = this.getHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(url, JSON.stringify(obj), { headers: headers })
      .pipe(catchError(this.handleError));
  }

  delete(resource: string) {
    const url = `${this.getBaseUrl()}/${resource}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  deleteWithResult(resource: string, id: number) {
    const url = `${this.getBaseUrl()}/${resource}/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  post(resource: string, obj: any) {
    const url = `${this.getBaseUrl()}/${resource}`;
    let headers = this.getHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post(url, JSON.stringify(obj), { headers: headers })
      .pipe(catchError(this.handleError));
  }

  findMembers(
    url:string, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<any[]> {

    return this.http.get(url, {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
        map(res =>  res["payload"])
    );
}
}


@Injectable()
export class CommonService {

  private dataSource = new Subject<object>();
  datasource$ = this.dataSource.asObservable();

  private permissionDataSource = new Subject<object>();
  permissionDatasource$ = this.permissionDataSource.asObservable();

  private parlourDataSource = new Subject<object>();
  parlourDataSource$ = this.parlourDataSource.asObservable();

  switchHeader(user: any) {
    this.dataSource.next(user);
  }

  permissionSwitchHeader(permission: any) {
    this.permissionDataSource.next(permission);
  }

  parlourSwitchHeader(parlour: any) {
    this.parlourDataSource.next(parlour);
  }
}
