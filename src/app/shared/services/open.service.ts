import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenService {

  constructor(private http: HttpClient) { }

  setBaseUrl(): void {
    localStorage.setItem('baseUrl', 'http://localhost:8009/open-source');
    localStorage.setItem('clientUrl', 'http://localhost:4300');
  }

  getBaseUrl(): any {
    return 'http://localhost:8009/open-source';
  }

  getClientUrl(): any {
    return localStorage.getItem('clientUrl');
  }

  isProduction(): boolean {
    return this.getBaseUrl() === 'https://osource.co.za/';
  }

  isLocal(): boolean {
    return this.getBaseUrl() === 'http://localhost:8000/open-source';
  }

  setUserToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserToken(): any {
    return localStorage.getItem('token');
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer ' + this.getUserToken());
    return headers;
  }

  getSecureHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getUserToken());
    return headers;
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
    return throwError(error);
  }

  getOne(resource: string, id: number) {
    const url = `${this.getBaseUrl()}/${resource}/${id}`;
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

  putUrl(path: string, obj: any): Observable<any> {
    const url = `${this.getBaseUrl()}/${path}`;
    let headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(url, JSON.stringify(obj), { headers: headers })
      .pipe(catchError(this.handleError));
  }

  put(resource: string, obj: any): Observable<any> {
    const url = `${this.getBaseUrl()}/${resource}/${obj.id}`;
    let headers = this.getHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(url, JSON.stringify(obj), { headers: headers })
      .pipe(catchError(this.handleError));
  }

  delete(resource: string, id: number) {
    const url = `${this.getBaseUrl()}/${resource}/${id}`;
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

}
