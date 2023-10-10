import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentdetailsComponent } from './documentdetails/documentdetails.component';
import { DocumentuploadComponent } from './documentupload/documentupload.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
// import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    DocumentdetailsComponent,
    DocumentuploadComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent 
  ],
  imports: [
    BrowserModule, FormsModule,  AngularFireModule.initializeApp(environment.firebaseConfig),AngularFirestoreModule, 
    AppRoutingModule,AngularFireDatabaseModule,MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
    AngularFireStorageModule,BrowserAnimationsModule,MatFormFieldModule,MatCardModule,MatTableModule, MatPaginatorModule,
    ReactiveFormsModule,MatSnackBarModule, ToastrModule.forRoot() // Add ToastrModule with its configuration
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
