import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the FormBuilder and FormGroup
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  likeCount = 1;
  shareCount = 1;
  loginForm: FormGroup;
  emailRequiredError: boolean = false;
  passwordRequiredError: boolean = false;
  userData$ = this.authenticationService.userData$;
  

  longText = `Welcome to our Document Management System (DMS), where we are committed to revolutionizing the way organizations handle, store, and retrieve their important documents. At YBSoftwareEngineeringVlogz, we understand the challenges that businesses face when managing a multitude of documents, from invoices and contracts to reports and presentations.

  Our mission is to provide a comprehensive and user-friendly solution that streamlines document-related processes, enhances productivity, and ensures the security and accessibility of your valuable information.`;
  email: string = '';
  password: string = '';
  constructor(public authenticationService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  like() {
    this.likeCount++;
    this.snackBar.open('Liked ❤️!', 'Dismiss', {
      duration: 2000, // Duration in milliseconds
    });
  }
  shareOnFacebook() {
    const urlToShare = encodeURIComponent('YOUR_URL_HERE');
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
    window.open(facebookShareUrl, '_blank');
  }

  // Function to share on LinkedIn
  shareOnLinkedIn() {
    const urlToShare = encodeURIComponent('http://localhost:4200/login');
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
    window.open(linkedInShareUrl, '_blank');
  }


  share() {
    this.shareCount++;
    this.snackBar.open('Shared successfully!', 'Dismiss', {
      duration: 2000, // Duration in milliseconds
    });
    this.shareOnFacebook();
    this.shareOnLinkedIn();
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
          else {
            this.authenticationService.SignIn(email, password);
          }
        }
      }
    }
  }
}