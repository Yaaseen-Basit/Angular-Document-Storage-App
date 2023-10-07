import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  
  isLoggedIn: boolean = false; 
  toggleSidenav() {
    this.sidenav.toggle();
  }
  constructor(private authService: AuthService,private router: Router,private route: ActivatedRoute) {
   }

   ngOnInit(): void {
    this.authService.userData$.subscribe(user => {
      this.isLoggedIn = !!user; 
    });
  }
  isActive(routePath: string): boolean {
    const currentRoute = this.route.snapshot.routeConfig?.path;
        return currentRoute === routePath;
  }
  logout() {
    this.authService.SignOut();
        this.router.navigate(['/login']);
     
  }
}
