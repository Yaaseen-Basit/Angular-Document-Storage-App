import { NgModule } from '@angular/core';
import { RouterModule, Routes ,ExtraOptions} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentuploadComponent } from './documentupload/documentupload.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { DocumentdetailsComponent } from './documentdetails/documentdetails.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: DocumentuploadComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DocumentdetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent,  },

  { path: 'signup', component: SignupComponent },
  { path: 'documents/:id', component: DocumentdetailsComponent },

  // Add more routes for other pages
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
