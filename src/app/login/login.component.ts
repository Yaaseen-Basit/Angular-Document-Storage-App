import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the FormBuilder and FormGroup

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  emailRequiredError: boolean = false; 
  passwordRequiredError: boolean = false;
  userData$ = this.authenticationService.userData$;

  email: string = '';
  password: string = '';
  constructor(public authenticationService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }
  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  signIn() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;

        if (email && password) {
          this.emailRequiredError = emailControl.hasError('required') && emailControl.touched;
          this.passwordRequiredError = passwordControl.hasError('required') && passwordControl.touched;
          if (this.emailRequiredError || this.passwordRequiredError) {
            // Handle errors or display error messages
          }
          else{
          this.authenticationService.SignIn(email, password);
          }
        }
      }
    }
    // signOut() 
    //  {
    //   this.authenticationService.SignOut();
    // }
  }
}