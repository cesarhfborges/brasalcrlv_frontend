import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/error') {
      return true;
    } else if (this.authService.isAuthenticated()) {
      if (['/login', '/recuperar-senha'].includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (['/login', '/recuperar-senha'].includes(state.url)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (state.url === '/error') {
      return true;
    } else if (this.authService.isAuthenticated()) {
      if (['/login', '/recuperar-senha'].includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (['/login', '/recuperar-senha'].includes(state.url)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
