import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData$: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router,private toastr: ToastrService) {
    this.userData$ = angularFireAuth.authState;
  }
  isLoggedIn(): boolean {
    return this.angularFireAuth.currentUser !== null;
  }
SignUp(email: string, password: string) {
  this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.toastr.success('Account created successfully!', 'Success');
      this.router.navigate(['/login']); 

    })
    .catch((error) => {
      this.toastr.error('Error creating account: ' + error.message, 'Error');

    });
}

/* Sign up */
SignIn(email: string, password: string): void {
  this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('Successfully signed in!');
    })
    .catch((error) => {
      console.log('Something went wrong:', error.message);
    });
}

// Sign out
SignOut(): void {
  this.angularFireAuth.signOut()
    .then(() => {
      console.log('Successfully signed out!');
      this.toastr.success(`Successfully signed out!`, 'Success');

      this.router.navigate(['/login']); 
    })
    .catch((error) => {
      console.log('Sign-out error:', error.message);
    });
}
 
}

