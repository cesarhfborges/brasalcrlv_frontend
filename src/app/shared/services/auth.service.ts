import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {isNull} from "util";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: Usuario;
  private token: string;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const contents = localStorage.getItem('contents');
    if (!isNull(contents)) {
      this.usuario = JSON.parse(atob(contents)).user;
      this.token = JSON.parse(atob(contents)).access_token;
    }
  }

  isAuthenticated(): Boolean {
    return !!localStorage.getItem('contents');
  }

  getUser(): Usuario {
    return JSON.parse(atob(localStorage.getItem('contents'))).user;
  }

  getToken(): string {
    return JSON.parse(atob(localStorage.getItem('contents'))).access_token;
  }

  login(data:{email:string, password:string, remember:boolean}): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, data)
      .pipe(map(response => {
        console.log(response);
        if (response.access_token) {
          localStorage.setItem('contents', btoa(JSON.stringify(response)));
          if (!environment.production) {
            localStorage.setItem('contents_backup', JSON.stringify(response));
          }
          return true;
        }
        return false;
      }));
  }

  logout(): void {
    setTimeout(() => {
      localStorage.removeItem('contents');
      window.location.reload();
    }, 2000);
  }

  private logoutExec(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/logout`);
  }
}
