import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string = ''; 
  password: string = '';
  constructor(public authenticationService: AuthService) {}
  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = ''; // Reset the email input field
    this.password = '';
  }
  signIn() {
    this.email = ''; 
    this.password = '';
  }
  signOut() {
    this.authenticationService.SignOut();
  }
}
