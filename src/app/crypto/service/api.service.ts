import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
    return new HttpHeaders(headersConfig);        
  }

  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http
      .get<T>(url, {
        headers: this.headers,
        params
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}