import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpUrlEncodingCodec
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['login']);
  }

  login({ username, password }: any): Observable<any> {
    const body = new HttpParams({ encoder: new HttpUrlEncodingCodec() })
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const url = environment.backbone + '/login';

    return this.http
      .post<any>(url, body.toString(), { headers, observe: 'response' })
      .pipe(
        map(
          (res) => {
            const token = res['body']['accessToken'];

            if (token) {
              localStorage.setItem('accessToken', token);
              localStorage.setItem('user', JSON.stringify(res['body']['user']));
            } else {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('user');
            }
            return token ? true : false;
          },
          (err: any) => {
            return false;
          }
        )
      );
  }
}
