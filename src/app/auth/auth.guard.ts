import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        // Redirect to the login page if not authenticated
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

