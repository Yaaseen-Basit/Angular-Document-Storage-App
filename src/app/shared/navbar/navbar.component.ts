import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


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
  constructor(private authService: AuthService,private router: Router) {
   }
   ngOnInit(): void {
    this.authService.userData$.subscribe(user => {
      this.isLoggedIn = !!user; 
    });
  }
  
  logout() {
    this.authService.SignOut();
        this.router.navigate(['/login']);
     
  }
}
